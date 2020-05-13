export default (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                email : action.payload.email,
                token : action.payload.token,            
                loading : false 
            }

        case "LOGOUT":
            return {
                ...state,
                email : "",
                token : "",            
                loading : false 
            }
               
        case "ERROR":
            return {
                ...state,
                loading : false,
                error : "Something went wrong..." 
            }

        default: return state
    }
}