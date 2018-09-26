package traits

/**
 * Methods to manage user credentials.
 */
trait Users {
  Map env = System.getenv()
  Map getSendingFuelSupplier() {
    logUser([username:env['SUPPLIER_ONE_USERNAME'], password:env['SUPPLIER_ONE_PASSWORD']])
  }

  Map getReceivingFuelSupplier() {
    logUser([username:env['SUPPLIER_TWO_USERNAME'], password:env['SUPPLIER_TWO_PASSWORD'], org:env['SUPPLIER_TWO_ORG']])
  }

  Map getAnalyst() {
    logUser([username:env['ANALYST_USERNAME'], password:env['ANALYST_PASSWORD']])
  }

  Map getDirector() {
    logUser([username:env['DIRECTOR_USERNAME'], password:env['DIRECTOR_PASSWORD']])
  }

  Map logUser(Map user) {
    println("======================================")
    println(user)
    println("======================================")
    return user
  }
}
