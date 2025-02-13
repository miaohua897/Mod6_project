// const jwtToken = localStorage.getItem('jwt_token'); 

export const createASong=(data)=>async(dispatch)=>{
    // const csrfToken = document.cookie
    // .split("; ")
    // .find(row => row.startsWith("csrf_token"))
    // ?.split("=")[1];

    const res = await fetch('/api/songs',{
        method:'POST',
        // headers:{
        //     "X-CSRF-TOKEN": csrfToken,
        // },
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
        console.log('update a song', data)
        dispatch(update_song(data))
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
        dispatch(delete_song(song_id))
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

export const getAllSongs = () => async dispatch => {
    const res = await fetch('/api/songs/')
    if(res.ok){
        const data = await res.json()
        dispatch(load_all_songs(data.songs))
        return data
    }
}

const load_all_songs = (data) => ({
    type:'LOAD_ALL_SONGS',
    payload:data
})

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
const update_song=(data)=>({
    type:'UPDATE_SONG',
    payload:data
})
const initialState={songs: [], currentUserAllSongs:[]}
function songReducer(state=initialState,action){
    switch(action.type){
        case 'LOAD_ALL_SONGS':
            return { ...state, songs: action.payload }
        case 'LOAD_SONGS':
            return {...state,currentUserAllSongs:action.payload}
        case 'ADD_SONG':
                {
                let arr =[]
                arr=state.songs
                arr.push(action.payload)
                let arr1=[]
                arr1=state.currentUserAllSongs
                arr1.push(action.payload)
                
            return {...state,songs:arr,currentUserAllSongs:arr1}} 
        //    {let arr =[]
        //     arr=state.currentUserAllSongs
        //     arr.push(action.payload)
        //     return {...state,currentUserAllSongs:arr}} 
        case 'DELETE_SONG':
            {
                let arr =[]
                state.songs.map(el=>{
                    if(el.id !== action.payload){
                        arr.push(el)
                    }
                })

              let arr1 =[]
                state.currentUserAllSongs.map(el=>{
                    if(el.id !== action.payload){
                        arr1.push(el)
                    }
                })

                return {...state, songs:arr,currentUserAllSongs:arr1}
            }
        case 'UPDATE_SONG':
            {
                let arr=[]
                let el_new={}
                state.songs.map(el=>{
                    if(el.id !== action.payload.id){
                        arr.push(el)
                    }else{
                        el_new= action.payload
                        el_new['albums']=el['albums']
                        el_new['likes']=el['likes']
                        arr.push(el_new)
                    }
                })
                let arr1=[]
                let el_new1={}
                state.currentUserAllSongs.map(el=>{
                    if(el.id !== action.payload.id){
                        arr1.push(el)
                    }else{
                        el_new1= action.payload
                        el_new1['albums']=el['albums']
                        el_new1['likes']=el['likes']
                        arr1.push(el_new1)
                    }
                })
                return {...state, songs:arr,currentUserAllSongs:arr1}
            }
        // case 'DELETE_SONG':
        //     {
        //         let arr =[]
        //         state.currentUserAllSongs.map(el=>{
        //             if(el.id !== action.payload){
        //                 arr.push(el)
        //             }
        //         })
        //         return {...state,currentUserAllSongs:arr}
        //     }
        // case 'UPDATE_SONG':
        //     {
        //         let arr=[]
        //         let el_new={}
        //         state.currentUserAllSongs.map(el=>{
        //             if(el.id !== action.payload.id){
        //                 arr.push(el)
        //             }else{
        //                 el_new= action.payload
        //                 el_new['albums']=el['albums']
        //                 el_new['likes']=el['likes']
        //                 arr.push(el_new)
        //             }
        //         })
        //         return {...state,currentUserAllSongs:arr}
        //     }
        default:
            return state
    }

}
export default songReducer