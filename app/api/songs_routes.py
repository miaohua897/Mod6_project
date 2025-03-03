
from flask import Blueprint,jsonify,request
from app.models import Song,Album,album_songs,db,likes,User
from sqlalchemy.orm import joinedload
from flask_login import login_required,current_user
song_routes =Blueprint('songs',__name__)
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename)
from sqlalchemy import desc


@song_routes.route('/',methods=['GET'])
def get_songs_lazeloading():
    all_songs = Song.query.order_by(desc(Song.id)).options(
    joinedload(Song.albums),  
    joinedload(Song.user_likes)    
    ).all()   
    result={}
    result_arr=[]
    like_arr=[]
    result_song=[]
    for songs in all_songs:
        result={**songs.to_dict()}
        print(result)
        for album in result['albums']:
            result_dic={**album.to_dict_song()}
           
            result_dic['artist']=result_dic['artist'].to_dict()
            print('album_user',result_dic)
            result_dic_songs=[]
            for song in result_dic['songs']:
                result_dic_songs.append(song.title )
            result_dic['songs']=result_dic_songs
            

            result_arr.append(result_dic)
        result['albums']=result_arr
        result["artist"]=result["artist"].artist_name
        for like in result['likes']:
            like_dic={**like.to_dict()}
            like_arr.append(like_dic)
        result['likes']=like_arr
        result_song.append(result)

    return jsonify({
        'songs':result_song
    })


@song_routes.route('/current',methods=['GET'])
@login_required
def get_songs_lazeloading_curr():
    all_songs = Song.query.filter_by(user_id =current_user.id).options(
    joinedload(Song.albums),  
    joinedload(Song.user_likes)    
    ).all()   
    result={}
    result_arr=[]
    like_arr=[]
    result_song=[]
    for songs in all_songs:
        result={**songs.to_dict()}
        for album in result['albums']:
            result_dic={**album.to_dict_song()}
           
            result_dic['artist']=result_dic['artist'].to_dict()
            result_dic_songs=[]
            for song in result_dic['songs']:
                result_dic_songs.append({
                    'title':song.title,
                    'duration':song.duration,
                    'id':song.id
                    } )
            result_dic['songs']=result_dic_songs
            

            result_arr.append(result_dic)
        result['albums']=result_arr

        # print('artist',result["artist"].artist_name)
        result["artist"]=result["artist"].artist_name
        for like in result['likes']:
            like_dic={**like.to_dict()}
            like_arr.append(like_dic)
        result['likes']=like_arr
        result_song.append(result)

    return jsonify({
        'songs':result_song
    })
    
@song_routes.route('',methods=['POST'])
@login_required
def post_songs():
    try:
        user_id =request.form['user_id']
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        audio = request.files["audio"]
        audio.filename = get_unique_filename(audio.filename)
        upload_audio = upload_file_to_s3(audio)
        title=request.form['title']
        duraton=request.form['duraton']
        lyrics=request.form['lyrics']
        genre =request.form['genre']
        release_year=request.form['release_year']
        new_song= Song ( title=title,
                audio_url= upload_audio['url'],
                duration=duraton,
                lyrics=lyrics,
                genre=genre,
                release_year=release_year,
                image_url= upload['url'],
                user_id =user_id 
                )
   
        db.session.add(new_song)
        db.session.commit()

        new_song_dict =new_song.to_dict()
        new_song_dict["artist"]=new_song_dict["artist"].artist_name
        return new_song_dict
    except KeyError as e:
        return jsonify({"keyerror": str(e)})
    except Exception as e:
        return jsonify({"error": str(e)})

@song_routes.route('/<int:song_id>',methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)
    song_dict = song.to_dict()
    if song is None :
        return jsonify({
        'message':'the song is not in database'
    })
    db.session.delete(song)
    db.session.commit()
    return jsonify({
        'message':'delete it'
    })

@song_routes.route('/<int:song_id>',methods=['PUT'])
@login_required
def update_song(song_id):
    try:

        song = Song.query.get(song_id)

        title=request.form['title']
        duration=request.form['duraton']
        lyrics=request.form['lyrics']
        genre =request.form['genre']
        release_year=request.form['release_year']
        user_id =request.form['user_id']
        image = request.files.get("image")
        print(image)
        if image is not None:
            image = request.files["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

        audio = request.files.get('audio')
        if audio is not None:
            audio = request.files["audio"]
            audio.filename = get_unique_filename(audio.filename)
            upload_audio = upload_file_to_s3(audio)
            print(upload_audio)

        song.title = title
        if audio is not None:
            song.audio_url=upload_audio['url']
        song.duration =duration
        song.lyrics = lyrics
        song.genre = genre
        song.release_year = release_year
        if image is not None:
            song.image_url =upload['url']

        db.session.commit()
        artist_name = User.query.get(song.user_id).artist_name
        return {
            'id':song_id,
            'title':song.title,
            'audio_url':song.audio_url,
            'duration':song.duration,
            'lyrics':song.lyrics,
            'genre':song.genre,
            'release_year':song.release_year,
            'image_url':song.image_url,
            'artist':artist_name 
            }
    except KeyError as e:
        return jsonify({"keyerror": str(e)})
    except Exception as e:
        return jsonify({"error": str(e)})
        
