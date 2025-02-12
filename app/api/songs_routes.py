
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
    # all_songs = Song.query.options(
    # joinedload(Song.albums),  
    # joinedload(Song.user_likes)    
    # ).all()   
    # print(all_songs[0].to_dict())
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
        print("albums",result['albums'])
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
    # print(all_songs[0].to_dict())
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
        print("albums",result['albums'])
        result_song.append(result)

    return jsonify({
        'songs':result_song
    })
    
@song_routes.route('',methods=['POST'])
@login_required
def post_songs():
    try:
        user_id =request.form['user_id']
        
        # user = User.query.filter_by(id=user_id).first()

        # if user is None:
        #     return jsonify({
        #         'message':'login first, please'
        #     })

        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        # print(upload)
        audio = request.files["audio"]
        audio.filename = get_unique_filename(audio.filename)
        upload_audio = upload_file_to_s3(audio)
        # print(upload_audio)


        # print(current_user.id)
        title=request.form['title']
        duraton=request.form['duraton']
        lyrics=request.form['lyrics']
        genre =request.form['genre']
        release_year=request.form['release_year']
       

        # print(title,duraton,lyrics,genre)
        new_song= Song ( title=title,
                audio_url= upload_audio['url'],
                duration=duraton,
                lyrics=lyrics,
                genre=genre,
                release_year=release_year,
                image_url= upload['url'],
                user_id =user_id 
                )
        # songA =request.get_json()
        # # print("post", songA["title"] )
        # new_song= Song ( title=songA["title"],
        #         audio_url=songA["audio_url"],
        #         duration=songA["duration"],
        #         lyrics=songA["lyrics"],
        #         genre=songA["genre"],
        #         release_year=songA["release_year"],
        #         image_url=songA[ "image_url"],
        #         user_id =current_user.id
        #         )
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
    print('session=================>',current_user)
    song = Song.query.get(song_id)
    song_dict = song.to_dict()
    # print(song)
    if song is None :
        return jsonify({
        'message':'the song is not in database'
    })
    db.session.delete(song)
    db.session.commit()
    # return jsonify({
    #     'delete song':song.title
    # })
    return jsonify({
        'message':'delete it'
    })

@song_routes.route('/<int:song_id>',methods=['PUT'])
@login_required
def update_song(song_id):
    try:
        print('============>=>',song_id)
        song = Song.query.get(song_id)
        print(song)
        title=request.form['title']
        duration=request.form['duraton']
        lyrics=request.form['lyrics']
        genre =request.form['genre']
        release_year=request.form['release_year']
        user_id =request.form['user_id']
        print('============>')
        print('============>')
        print('============>')
        print('============>')
        print('============>')
        print('update a song',title,duration,lyrics,genre,release_year,user_id)
        print('==================>')
        image = request.files.get("image")
        # audio = request.files["audio"]
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


        # new_song=request.get_json()  
        
        # song.title = new_song['title']

        # song.audio_url = new_song['audio_url']

        # song.duration = new_song['duration'] 

        # song.lyrics = new_song['lyrics'] 

        # song.genre = new_song['genre'] 

        # song.release_year = new_song['release_year']

        # song.image_url = new_song['image_url'] 

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
    except KeyError as e:
        return jsonify({"keyerror": str(e)})
    except Exception as e:
        return jsonify({"error": str(e)})
        
# @song_routes.route('album/<int:album_id>', methods=['GET'])
# @login_required
# def get_songs_album(album_id):
#     album_songs = Album.query.get(album_id)
    
#     album_songs =album_songs.to_dict_song()
    
#     album_artist = album_songs['artist'].to_dict()
#     album_songs['artist']=album_artist
#     # print('album_songs',album_songs)
#     song_arr =[]
#     for song in album_songs['songs']:
#         song_dict=song.to_dict()
#         song_dict['albums']=[]
#         song_dict['likes']=[]
#         song_arr.append(song_dict)
#     album_songs['songs'] = song_arr
#     print('album_songs',album_songs)
#     return album_songs