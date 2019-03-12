
//switch case to determine the reducer according to their type
export default(state=[],action)=>{
    switch(action.type)
    {
        //case for fetching all posts from API
        case 'FETCH_POST':
        return action.payload;
       
        default :
        return state

    }
}