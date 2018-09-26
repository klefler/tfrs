package pages

import geb.Page

class LoginPage extends Page {
  static at = {
    printer(title) == 'Government of British Columbia' &&
    printer(browser.getCurrentUrl()) =~ 'logontest\\.gov\\.bc\\.ca' &&
    printer(pageTitle.text()) == 'Log in to dev.lowcarbonfuels.gov.bc.ca'
  }
  static url = '/' // when not logged in will be redirected to the external gov login page
  static content = {
    pageTitle { $('#login-to') }

    usernameField { $('#user') }
    passwordField { $('#password') }
    continueButton { $('input', type:'submit', value:'Continue') }
  }

  def printer(selector) {
    println('^^^^^^^^^^^^^^^^^^^^^^^^^')
    print(selector)
    println('^^^^^^^^^^^^^^^^^^^^^^^^^')
    return selector
  }
}
