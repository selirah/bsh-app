import React, { Component } from 'react'
import { MiscLayout } from 'layouts'
import { I400 } from 'illustrations'
import { FormattedMessage } from 'react-intl'
export class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: error, errorInfo: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <MiscLayout>
          <h1 className="font-lato mb-4 font-regular text-h6 md:text-h1 animate__animated animate__fadeInDown text-dark-btnText dark:text-light-btnText">
            <FormattedMessage defaultMessage="An error has been detected!" />
          </h1>
          <p className="font-montserrat mb-10 font-light text-pNormal md:text-pLarge animate__animated animate__fadeInUp text-light-text dark:text-dark-text">
            <FormattedMessage defaultMessage="Our technicians are fixing the issue now." />
          </p>
          <div className="hidden md:flex justify-center">
            <I400 />
          </div>
        </MiscLayout>
      )
    }
    return this.props.children
  }
}
