
from flask import Blueprint,jsonify,request
from app.models import Song,Album,album_songs,db,likes
from sqlalchemy.orm import joinedload
from flask_login import login_required,current_user
song_routes =Blueprint('songs',__name__)


@song_routes.route('/',methods=['GET'])
def get_songs_lazeloading():
    all_songs = Song.query.options(
    joinedload(Song.albums),  
    joinedload(Song.user_likes)    
    ).all()   
    # print(all_songs[0].to_dict())
    result={}
    result_arr=[]
    like_arr=[]
    for songs in all_songs:
        result={**songs.to_dict()}
        print(result)
        for album in result['albums']:
            result_dic={**album.to_dict()}
           
            result_dic['artist']=result_dic['artist'].to_dict()
            print('album_user',result_dic)
            result_dic_songs=[]
            for song in result_dic['songs']:
                result_dic_songs.append(song.title )
            result_dic['songs']=result_dic_songs
            

            result_arr.append(result_dic)
        result['albums']=result_arr
        
        for like in result['likes']:
            like_dic={**like.to_dict()}
            like_arr.append(like_dic)
        result['likes']=like_arr
        print("albums",result['albums'])

    return result


@song_routes.route('/current',methods=['GET'])
@login_required
def get_songs_lazeloading_curr():
    all_songs = Song.query.filter_by(user_id =current_user.id).options(
    joinedload(Song.albums),  
    joinedload(Song.user_likes)    
    ).all()   
    # print(all_songs[0].to_dict())
    result={}
    result_arr=[]
    like_arr=[]
    for songs in all_songs:
        result={**songs.to_dict()}
        print(result)
        for album in result['albums']:
            result_dic={**album.to_dict()}
           
            result_dic['artist']=result_dic['artist'].to_dict()
            print('album_user',result_dic)
            result_dic_songs=[]
            for song in result_dic['songs']:
                result_dic_songs.append(song.title )
            result_dic['songs']=result_dic_songs
            

            result_arr.append(result_dic)
        result['albums']=result_arr
        
        for like in result['likes']:
            like_dic={**like.to_dict()}
            like_arr.append(like_dic)
        result['likes']=like_arr
        print("albums",result['albums'])

    return result
    
@song_routes.route('/',methods=['POST'])
@login_required
def post_songs():
    print(current_user.id)
    songA =request.get_json()
    print("post", songA )
    new_song= Song ( title=songA["title"],
            audio_url=songA["audio_url"],
            duration=songA["duration"],
            lyrics=songA["lyrics"],
            genre=songA["genre"],
            release_year=songA["release_year"],
            image_url=songA[ "image_url"],
            user_id =current_user.id
            )
    db.session.add(new_song)
    db.session.commit()
 
    return new_song.to_dict()

@song_routes.route('/<int:song_id>',methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)
    print(song)
    db.session.delete(song)
    db.session.commit()
    return song.title

@song_routes.route('/<int:song_id>',methods=['PUT'])
@login_required
def update_song(song_id):
    song = Song.query.get(song_id)
    print(song)
    new_song=request.get_json()  
    if new_song['title'] is not None:
        song.title = new_song['title']
    if new_song['audio_url'] is not None:
        song.audio_url = new_song['audio_url']
    if new_song['duration'] is not None:
        song.duration = new_song['duration'] 
    if new_song['lyrics'] is not None:
        song.lyrics = new_song['lyrics'] 
    if new_song['genre'] is not None:
        song.genre = new_song['genre'] 
    if new_song['release_year'] is not None:
        song.release_year = new_song['release_year']
    if new_song['image_url'] is not None:
        song.image_url = new_song['image_url'] 

    db.session.commit()
    return {
        'song_name':song.title,
        'audio_url':song.audio_url,
        'duration':song.duration,
        'lyrics':song.lyrics,
        'genre':song.genre,
        'release_year':song.release_year,
         'image_url':song.image_url
        }