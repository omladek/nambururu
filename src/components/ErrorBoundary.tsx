import { Component, ErrorInfo, JSX } from 'preact'

interface Props {
  children?: JSX
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
  }

  public static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo)
  }

  public render(): JSX.Element {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <div>⚠️ Error!</div>
    }

    return children
  }
}

export default ErrorBoundary
