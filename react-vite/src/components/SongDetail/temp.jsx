<tbody >
{
    song.albums.length !==0?
   song.albums[0].songs.map((el,index)=>(
    <tr key={index} className="tableBody">
        <td>
            <button style={{backgroundColor:"transparent"}} ><FaPlay size={15} color="darkgreen"  /></button>
        </td>
        <td
        onClick={()=>navigate(`/song/${el.id}`)}
        >{el.title}</td>
        <td
        onClick={()=>navigate(`/song/${el.id}`)}
        >{song.albums[0].artist.artist_name}</td>
        <td
        onClick={()=>navigate(`/song/${el.id}`)}
        >{el.duration}</td>
        <td>
          <div>
         
          
          <div className="songDetailDropDown">
            <button
            key={index}
            className="songDetailDropDownButton"
             onClick={(e)=>
            {
                e.stopPropagation();
                setDropdown(true);
                setSelectSong(el.id)
            }
                
                }>...</button>
            {

               dropdown&&selectSong===el.id?
               <div className="updateDeleteContainer">
                 <button 
                 className="updateASongNav"
                 onClick={()=>navigate(`/songs/${el.id}/update`)}>
                    <FaEdit />
                    {'                                      '}
                     update a song</button>
                 {/* <p className="updateDeleteDividedLine"></p> */}
                 <button 
                 className="deleteASongNav"
                 onClick={openModal}>
                    <FaTrash />
                    {'                                      '}
                     delete a song</button>
                <Modal isOpen={isModalOpen} 
                className="deleteAModal"
                overlayClassName="deleteAOverlay"
                onRequestClose={closeModal} 
                contentLabel="delete a song">
                {/* <button 
                className="closeDeleteButton"
                onClick={closeModal}> ✖️ </button> */}
                <DeleteASong song_id={el.id} closeModal={closeModal} title={el.title}/>  
                </Modal>
                </div>
              
               :null
         }

         
          </div>

          </div>
   
         
        </td>

    </tr>
   )) 
   :null
}
</tbody>