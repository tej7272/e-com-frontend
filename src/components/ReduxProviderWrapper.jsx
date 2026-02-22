
import { Provider } from 'react-redux'
import store from '../redux/store'

export const ReduxProviderWrapper = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
} 