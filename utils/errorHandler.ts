import { AddToast } from 'react-toast-notifications'
import { ApolloError } from 'apollo-client'

const errorHandler = (error: ApolloError, addToast: AddToast) => {
    addToast(error.graphQLErrors[0].message, {
        appearance: 'error',
        autoDismiss: true
    })
}

export default errorHandler
