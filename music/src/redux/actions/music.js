'use strict'

import Api from '../../shared/Api';

export function changeSong(songList) {
  return dispatch => {
    dispatch(onChangeSong(songList));
  };
}

function onChangeSong(songList) {
  return {
    type: type.MUSIC_CHANGE,
    songList,
  };
}

export function controlPlay(songOrder) {
  return dispatch => {
    dispatch(onControlPlay(songOrder));
  };
}

function onControlPlay(songOrder) {
  return {
    type: type.MUSIC_CONTROL,
    songOrder,
  };
}

export function songId(songId) {
  return dispatch => {
    dispatch(onSongId(songId));
  };
}

function onSongId(songId) {
  return {
    type: type.MUSIC_ID,
    songId,
  };
}

export function songName(songName) {
  return dispatch => {
    dispatch(onSongName(songName));
  };
}

function onSongName(songName) {
  return {
    type: type.MUSIC_NAME,
    songName,
  };
}

export function singerName(singerName) {
  return dispatch => {
    dispatch(onSingerName(singerName));
  };
}

function onSingerName(singerName) {
  return {
    type: type.MUSIC_SINGER_NAME,
    singerName,
  };
}
