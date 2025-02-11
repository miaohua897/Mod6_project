// const jwtToken = localStorage.getItem('jwt_token'); 

export const createASong=(data)=>async(dispatch)=>{
    const csrfToken = document.cookie
    .split("; ")
    .find(row => row.startsWith("csrf_token"))
    ?.split("=")[1];

    const res = await fetch('/api/songs',{
        method:'POST',
        headers:{
            "X-CSRF-TOKEN": csrfToken,
        },
        body: data,
        
    })
    if(res.ok){
        const data= await res.json()
        dispatch(add_song(data))
        return data
    }
}
export const updateASong=(data,song_id)=>async(dispatch)=>{
    const csrfToken = document.cookie
    .split("; ")
    .find(row => row.startsWith("csrf_token"))
    ?.split("=")[1];

    const res = await fetch(`/api/songs/${song_id}`,{
        method:'PUT',
        "X-CSRF-TOKEN": csrfToken,
        body: data
    })
    if(res.ok){
        const data= await res.json()
 
        return data
    }
}

export const deleteASong=(song_id)=> async(dispatch)=>{
    const res = await fetch(`/api/songs/${song_id}`,{
        method:'DELETE'
    })
    if(res.ok){
        const data = await res.json()
        console.log('delete song',data)
        dispatch(delete_song(data))
        return data
    }
}

export const getCurrentAllSongs=()=>async(dispatch)=>{

    const res = await fetch('/api/songs/current')
    if(res.ok){
        const data = await res.json()
        dispatch(load_songs(data.songs))
        return data
    }
}
const load_songs=(data)=>({
    type:'LOAD_SONGS',
    payload:data

})
const add_song=(data)=>({
    type:'ADD_SONG',
    payload:data
})
const delete_song=(data)=>({
    type:'DELETE_SONG',
    payload:data
})
const initialState={currentUserAllSongs:[]}
function songReducer(state=initialState,action){
    switch(action.type){
        case 'LOAD_SONGS':
            return {...state,currentUserAllSongs:action.payload}
        case 'ADD_SONG':
           {let arr =[]
            arr=state.currentUserAllSongs
            arr.push(action.payload)
            return {...state,currentUserAllSongs:arr}} 
        case 'DELETE_SONG':
            {
                let arr =[]
                state.currentUserAllSongs.map(el=>{
                    if(el.id !== action.payload.id){
                        arr.push(el)
                    }
                })
                return {...state,currentUserAllSongs:arr}
            }
        default:
            return state
    }

}
export default songReducer