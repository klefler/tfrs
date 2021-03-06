/*
 * Presentational component
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';

import { getCreditTransferType } from '../../actions/creditTransfersActions';
import history from '../../app/History';
import CREDIT_TRANSACTIONS from '../../constants/routes/CreditTransactions';
import { CREDIT_TRANSFER_STATUS } from '../../constants/values';
import * as Routes from '../../constants/routes';

class UserHistoryTable extends React.Component {
  constructor () {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetch = this.fetch.bind(this);
  }

  fetch (state, instance) {
    this.setState({ loading: true });

    const offset = state.page * state.pageSize;
    const limit = state.pageSize;
    const id = this.props.userId;

    const sortBy = state.sorted[0].id;
    const sortDirection = state.sorted[0].desc ? '-' : '';

    new Promise((resolve, reject) =>
      axios.get(`${Routes.BASE_URL}${Routes.USERS}/${id}/history`, {
        params: {
          limit,
          offset,
          sort_by: sortBy,
          sort_direction: sortDirection
        }
      }).then(response =>
        resolve({
          rows: response.data,
          pages: Math.ceil(parseInt(response.headers['x-total-count'], 10) / state.pageSize)
        }))).then((data) => {
      this.setState({
        data: data.rows,
        pages: data.pages,
        loading: false
      });
    });
  }

  render () {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });

    const columns = [{
      accessor: 'id',
      className: 'col-id',
      Header: 'ID',
      resizable: false,
      show: false,
      width: 50
    }, {
      accessor: item => (item.isRescinded
        ? CREDIT_TRANSFER_STATUS.rescinded.description
        : (
          Object.values(CREDIT_TRANSFER_STATUS).find(element => element.id === item.statusId)
        ).description),
      className: 'col-action',
      Header: 'Action Taken',
      id: 'action',
      minWidth: 75
    }, {
      accessor: item => getCreditTransferType(item.type.id),
      className: 'col-type',
      Header: 'Transaction Type',
      id: 'creditType',
      width: 150
    }, {
      accessor: item => item.creditTradeId,
      className: 'col-id',
      Header: 'Transaction ID',
      id: 'creditTradeId',
      resizable: false,
      width: 100
    }, {
      accessor: (item) => {
        if (item.creditTradeUpdateTimestamp) {
          const ts = Date.parse(item.creditTradeUpdateTimestamp);

          return formatter.format(ts);
        }

        return '-';
      },
      className: 'col-timestamp',
      Header: 'Timestamp',
      id: 'createTimestamp',
      minWidth: 75
    }, {
      accessor: item => item.fuelSupplier.name,
      Header: 'Fuel Supplier',
      id: 'fuelSupplier',
      minWidth: 100,
      sortable: false
    }];

    const { data, pages, loading } = this.state;

    return (
      <ReactTable
        defaultPageSize={10}
        defaultSorted={[{
          id: 'createTimestamp',
          desc: true
        }]}
        filterable={false}
        getTrProps={(state, row) => {
          if (row && row.original) {
            return {
              onClick: (e) => {
                const viewUrl = CREDIT_TRANSACTIONS.DETAILS.replace(':id', row.original.creditTradeId);
                history.push(viewUrl);
              },
              className: 'clickable'
            };
          }

          return {};
        }}
        manual
        data={data}
        pages={pages}
        loading={loading}
        onFetchData={this.fetch}
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        sortable
        multisort={false}
        columns={columns}
      />
    );
  }
}

UserHistoryTable.propTypes = {
  userId: PropTypes.number.isRequired
};

export default UserHistoryTable;
