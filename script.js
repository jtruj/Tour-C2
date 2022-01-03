(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist,this.mainPlayList]); this.playList_2C1DD5B9_2122_7E2F_41A2_0F8B3EE43BE4.set('selectedIndex', 0)",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "layout": "absolute",
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF",
  "this.IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scripts": {
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "existsKey": function(key){  return key in window; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "registerKey": function(key, value){  window[key] = value; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Player435"
 },
 "class": "Player",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -54.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DB9F6F5_2122_7A27_41B8_A825F83F9DFB"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 79.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D1786A0_2122_7ADD_41AC_000524E60242"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 156.97,
   "backwardYaw": -16.37,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "distance": 1
  },
  {
   "yaw": -177.4,
   "backwardYaw": 0.46,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_t.jpg",
 "label": "Balcon",
 "id": "panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 399.45,
   "angle": 0,
   "y": 730.65,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_11FBD64B_0412_F84E_413D_B9D3328CDCCA",
  "this.overlay_1282AE35_0413_0BDA_418F_E77578220BF5",
  "this.overlay_13DED2D4_0433_1859_4164_CF05CA4D96EC",
  "this.overlay_0972EF69_04E9_E25E_4173_631CD9CC4697",
  "this.overlay_09721F69_04E9_E25E_4193_64629FAD1217"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -95.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2CBE7602_2122_7DDD_419C_C51AAAFB3ADF"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DF3A721_2122_7BDC_41A1_290500B5B740"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_camera"
},
{
 "items": [
  "this.PanoramaPlayListItem_2C6275BF_2122_7E22_4175_79D7737103A2",
  "this.PanoramaPlayListItem_2C6515C2_2122_7E5D_41B8_7AD254A73F61",
  "this.PanoramaPlayListItem_2C65A5C2_2122_7E5D_41B3_34340EC23169",
  "this.PanoramaPlayListItem_2C6645C2_2122_7E5D_41B5_20062562F9ED",
  "this.PanoramaPlayListItem_2C66B5C3_2122_7E63_41B7_BBD595A29DD4",
  "this.PanoramaPlayListItem_2C6745C3_2122_7E63_4198_E89E5C533E88",
  "this.PanoramaPlayListItem_2C67E5C3_2122_7E63_41A5_9D05BA7E6FD5",
  "this.PanoramaPlayListItem_2C6855C3_2122_7E63_41B6_CF879C03A6FE",
  "this.PanoramaPlayListItem_2C68F5C4_2122_7E65_41A1_E23AB6147275",
  "this.PanoramaPlayListItem_2C6965C4_2122_7E65_41B2_94612A0687C3",
  "this.PanoramaPlayListItem_2C6A05C4_2122_7E65_416D_FB32DB325BD1",
  "this.PanoramaPlayListItem_2C6AB5C4_2122_7E65_41B5_982FF893C803",
  "this.PanoramaPlayListItem_2C6B35C4_2122_7E65_41B2_0C63704E7CD3"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 154,
   "backwardYaw": 46.21,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_t.jpg",
 "label": "Ba\u00f1o Master",
 "id": "panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 302.96,
   "angle": 181.75,
   "y": 613.3,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_17904889_04EB_EEDE_4190_4A607E8E6243",
  "this.overlay_17905889_04EB_EEDE_417C_FB43FF017C21",
  "this.overlay_1F38BC53_052B_E672_418D_348283000080"
 ]
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_2C1DF5B9_2122_7E2F_41A8_919D9913EAF4",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": -2.26,
  "class": "PanoramaCameraPosition",
  "pitch": -5.78
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_camera"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 163.5,
   "backwardYaw": 166.52,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0",
   "distance": 1
  },
  {
   "yaw": -172.63,
   "backwardYaw": -100.28,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DF904F_03EE_F846_418A_EB4568234C91",
   "distance": 1
  },
  {
   "yaw": -28.43,
   "backwardYaw": 178.09,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A",
   "distance": 1
  },
  {
   "yaw": -1.8,
   "backwardYaw": 153.24,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792",
   "distance": 1
  },
  {
   "yaw": 17.04,
   "backwardYaw": 3.22,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_t.jpg",
 "label": "Pasillo ",
 "id": "panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 759.34,
   "angle": 0,
   "y": 1283.52,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_1348650F_043D_39C6_4180_0E867291255F",
  "this.overlay_12E7B07F_043D_7847_4190_1E2AEE9BDA7C",
  "this.overlay_13921F2C_043D_09CA_418B_DC3F29887813",
  "this.overlay_13C08C85_043D_08BA_4167_08CD12C13FB2",
  "this.overlay_135A3F91_043D_08DA_4162_34584034F824",
  "this.overlay_16AA78B6_04FB_2E32_417A_086A2B6E031D",
  "this.overlay_16AA58B6_04FB_2E32_4181_FE864A7F7E89",
  "this.overlay_16C1841F_04FF_65F3_4177_0E69D87E540B",
  "this.overlay_10BB093A_04FF_EE32_4185_11F599B8FFC4",
  "this.overlay_16826F5E_04FE_E275_418F_79E91499E161"
 ]
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "Planta psd C2 N2",
 "id": "map_1F8E5064_0415_1879_4183_851972469B7D",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_1F8E5064_0415_1879_4183_851972469B7D_t.png",
 "width": 1212,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D.png",
    "width": 1212,
    "class": "ImageResourceLevel",
    "height": 2321
   },
   {
    "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_lq.png",
    "width": 184,
    "class": "ImageResourceLevel",
    "height": 353,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.11,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayInsideOpacity": 0.59,
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideColor": "#003366",
 "height": 2321,
 "overlays": [
  "this.overlay_199C25F4_0433_7859_4176_B147D4CFEB5E",
  "this.overlay_17AACECF_04EA_E252_4181_B948662B7F18",
  "this.overlay_178170D7_04EA_FE73_4185_AE9E634963B2",
  "this.overlay_1775C38B_04EA_E2D3_417E_35B4EBCF29E5",
  "this.overlay_102826F5_04E9_6237_415F_FFA56D5D5929",
  "this.overlay_1001797A_04E9_6E32_4183_BEBA528D0011",
  "this.overlay_10C2427E_04E9_2232_4142_89DAECB94556"
 ]
},
{
 "duration": 0,
 "to": "top",
 "id": "effect_0AD9D661_053B_29C4_4192_DB69966A018C",
 "easing": "linear",
 "class": "SlideOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 163.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DD04737_2122_7A24_41B6_88B158A20822"
},
{
 "items": [
  {
   "media": "this.video_1F269DE8_0536_E65E_4192_928E996FE92C",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_2C1F55B9_2122_7E2F_419B_6EC5444525D1, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_2C1F55B9_2122_7E2F_419B_6EC5444525D1, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_2C1F55B9_2122_7E2F_419B_6EC5444525D1",
 "class": "PlayList"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -100.28,
   "backwardYaw": -172.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_t.jpg",
 "label": "Cuarto Ni\u00f1os",
 "id": "panorama_09DF904F_03EE_F846_418A_EB4568234C91",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 420.32,
   "angle": 177.51,
   "y": 1792.05,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_1649C54F_04FB_2653_417A_C93B42A949A0",
  "this.overlay_1649B54F_04FB_2653_4157_3B93F1BB5915",
  "this.overlay_1EC2F885_0529_2ED6_4172_EAA7725640A7"
 ]
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 178.09,
   "backwardYaw": -28.43,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_t.jpg",
 "label": "Cuarto Ni\u00f1as ",
 "id": "panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 394.24,
   "angle": -86.6,
   "y": 1080.11,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_164ED60D_04F9_65D6_418F_F4517A38B6CA",
  "this.overlay_164EC60D_04F9_65D6_4176_5F43286B0DEA",
  "this.overlay_190A1EFD_0539_2237_418E_3D0386BFA15E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -23.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_2CAEC5F7_2122_7E23_41B4_5C874A2A514A",
 "id": "camera_2CAEB5F7_2122_7E23_41BB_6A2CA30DB516"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "Planta psd C2 N1",
 "id": "map_1FD90D93_0415_08DF_4190_221143275E0B",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_t.png",
 "width": 1212,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B.png",
    "width": 1212,
    "class": "ImageResourceLevel",
    "height": 2321
   },
   {
    "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_lq.png",
    "width": 184,
    "class": "ImageResourceLevel",
    "height": 353,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.11,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayInsideOpacity": 0.59,
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "class": "Map",
 "fieldOfViewOverlayInsideColor": "#003366",
 "height": 2321,
 "overlays": [
  "this.overlay_18BDE507_041D_79C7_4181_D793100115F1",
  "this.overlay_18224948_0417_0849_418F_5F628F651BA0",
  "this.overlay_18B98051_042F_385A_4160_C32B754DED00",
  "this.overlay_0AAF75A4_04EE_E6D6_414A_5752591719BC",
  "this.overlay_0A5EC656_04E9_2272_4164_493048CEA22E",
  "this.overlay_0A3C12E1_04E9_624E_418F_5D78B3378B9E"
 ]
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -58.52,
   "backwardYaw": -79.43,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7",
   "distance": 1
  },
  {
   "yaw": 153.24,
   "backwardYaw": -1.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_t.jpg",
 "label": "Cuarto Master",
 "id": "panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 600.26,
   "angle": 0,
   "y": 592.44,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_1631E414_04F9_25F5_4151_254D14A43BA6",
  "this.overlay_1631F414_04F9_25F5_4176_6F238C4F1BFE",
  "this.overlay_1091F6FE_04F9_2232_4177_036B6F01CABC",
  "this.overlay_1091C6FE_04F9_2232_415A_70D6FA524F36",
  "this.overlay_1FE25BDC_0537_6275_416A_7FF8B424D3E0"
 ]
},
{
 "duration": 0,
 "id": "effect_0AD9A661_053B_29C4_418F_3DF56B5118DE",
 "easing": "linear",
 "class": "SlideInEffect",
 "from": "top"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB"
  },
  {
   "yaw": 84.62,
   "backwardYaw": 20.81,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_t.jpg",
 "label": "Ba\u00f1o",
 "id": "panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 928.85,
   "angle": 181.44,
   "y": 967.97,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_11B211B1_0415_F8DD_4164_50D9A16D06D6",
  "this.overlay_097D0EF9_04EE_E23F_4170_F65D276AAC91",
  "this.overlay_1F838502_052B_27D2_4193_56DB1308B9CB"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -1.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D6296AB_2122_7A23_4155_717DDCB40770"
},
{
 "label": "Apartamentos Alegr\u00eda - Condado Naranjo, Mixco",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_1F269DE8_0536_E65E_4192_928E996FE92C_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_1F269DE8_0536_E65E_4192_928E996FE92C",
 "class": "Video",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_1F269DE8_0536_E65E_4192_928E996FE92C.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -133.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2ADFE669_2122_7A2F_41BB_FAC055BF32FA"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09DF904F_03EE_F846_418A_EB4568234C91_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 7.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D390680_2122_7ADD_41B6_46238F336C41"
},
{
 "items": [
  {
   "media": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09DF904F_03EE_F846_418A_EB4568234C91",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09DF904F_03EE_F846_418A_EB4568234C91_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist, 12, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -13.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D0DC695_2122_7AE7_4199_BE806C581FCF"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -14.7,
  "class": "PanoramaCameraPosition",
  "pitch": -3.2
 },
 "initialSequence": "this.sequence_1EF36FDE_0477_0846_4187_58C54C6887DF",
 "id": "panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -3.01,
  "class": "PanoramaCameraPosition",
  "pitch": -2.01
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 151.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D02B68A_2122_7AED_4197_E1FC8A1F913D"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 121.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DC2C72C_2122_7A24_41AB_0473E2AFE91F"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_camera"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 26.08,
   "backwardYaw": -150.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "distance": 1
  },
  {
   "yaw": 14.03,
   "backwardYaw": -165.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB",
   "distance": 1
  },
  {
   "yaw": 0.46,
   "backwardYaw": -177.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32"
  },
  {
   "yaw": 77.61,
   "backwardYaw": -107.31,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_t.jpg",
 "label": "Sala",
 "id": "panorama_09D72291_03ED_18DA_4185_437B866C59CE",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 409.89,
   "angle": 0,
   "y": 2037.19,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_13CA48C3_03F5_08BF_4151_758C30963D82",
  "this.overlay_13EBB08B_03F7_38CE_4147_E14AD5AA6FBB",
  "this.overlay_12BFE59A_03F7_18C9_4186_3B05A188B0C7",
  "this.overlay_100BC1C5_041D_18BB_4184_81850C8054AB",
  "this.overlay_1124751D_041D_79CB_418F_64B85B426D6C",
  "this.overlay_12A21846_0433_0846_4183_95F4680DAFB5",
  "this.overlay_184FDB7F_0415_0847_413D_BA54BAE0B9B4",
  "this.overlay_1E353E5C_0415_084A_418F_F0B86050A91C",
  "this.overlay_1E357E5C_0415_084A_4164_100941E11595",
  "this.overlay_1E356E5C_0415_084A_4183_36D3D893BBCC",
  "this.overlay_1DF3D1A6_0417_78C6_4172_34A04A34F5C6",
  "this.overlay_1F692265_0529_6256_418E_A63A212ACF63"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 14.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2AC3A649_2122_7A6F_41A2_3E38FBE04C01"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -173.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D5F56E0_2122_7A5D_41BC_BAC9DD20F115"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D5216D6_2122_7A65_4152_66D3C3391B23"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -179.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DDF8741_2122_7A5C_41B9_44DDF2C5699C"
},
{
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -162.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D96F70C_2122_7BE4_41BB_BDA762337E1F"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_2C1D95B9_2122_7E2F_4197_8CD88349882E",
 "class": "PlayList"
},
{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -150.78,
   "backwardYaw": 26.08,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
   "distance": 1
  },
  {
   "yaw": 6.24,
   "backwardYaw": -176.15,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB",
   "distance": 1
  },
  {
   "yaw": -16.37,
   "backwardYaw": 156.97,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E",
   "distance": 1
  },
  {
   "yaw": 20.81,
   "backwardYaw": 84.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32",
   "distance": 1
  },
  {
   "yaw": 125.07,
   "backwardYaw": -34.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_t.jpg",
 "label": "Comdedor",
 "id": "panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 730.65,
   "angle": 0,
   "y": 1426.95,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_134A99D0_03ED_0859_4166_09140ED1ACAC",
  "this.overlay_12C846FE_03ED_3846_4168_FF964D53DA34",
  "this.overlay_12555E19_03ED_0BCA_417B_69E4FCC53C25",
  "this.overlay_10C1E400_0413_1FB9_4164_AB18BD610900",
  "this.overlay_113E81C5_0413_18BB_414C_D1037F6C1AFF",
  "this.overlay_12E3C000_0433_17B9_418F_2BA6E3B05F00",
  "this.overlay_257DFC16_0413_0FD9_417D_C628194B077B",
  "this.overlay_257DCC16_0413_0FD9_418A_35306BADB882",
  "this.overlay_257DDC17_0413_0FC7_4190_2E90E9393620",
  "this.overlay_257DAC17_0413_0FC7_4190_BBC7DA4FCD9A",
  "this.overlay_257DBC17_0413_0FC7_418E_523194F86B3B"
 ]
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 166.52,
   "backwardYaw": 163.5,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_t.jpg",
 "label": "Ba\u00f1o secundario",
 "id": "panorama_09DF7581_03ED_18BB_415E_7BE678826ED0",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 889.73,
   "angle": 180,
   "y": 1865.07,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_16A1D069_04F9_5E5E_4183_04574DD89CF8",
  "this.overlay_16A1A069_04F9_5E5E_418D_152E470C899D",
  "this.overlay_1F3D895C_052B_6E76_415E_1AA0F0F3CECE"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 145.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_2C8C760C_2122_7DE5_41B2_83B225EEB58A",
 "id": "camera_2C8C660C_2122_7DE5_41BC_008FB38E10EE",
 "automaticRotationSpeed": 12
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 3.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2CA085EC_2122_7E25_41B7_CA32A072B5D1"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -102.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D876700_2122_7BDD_41B6_C732AD404A3C"
},
{
 "duration": 0,
 "id": "effect_0AA9A571_0527_6BC7_4188_B30F961A3ADF",
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 29.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2AFE163E_2122_7A25_4197_C6CC92EF885F"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_2C1D75B8_2122_7E2D_41BF_DADCAE6BADF4",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -176.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_2D7936BE_2122_7A25_41A2_F3AECFA75AA2",
 "id": "camera_2D7916BE_2122_7A25_4183_705B320D85C0",
 "automaticRotationSpeed": 12
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -153.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2C5125E0_2122_7E5D_41B6_6665D75A1874"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 2.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_2ACB6654_2122_7A65_41B1_EA7BFE0A2451",
 "id": "camera_2ACB5654_2122_7A65_41B7_657553D58F64"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -165.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DAB26EB_2122_7A23_41B0_FD6824CF99ED"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -159.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D2DE675_2122_7A27_41B7_2771CA9F08D6"
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": 46.21,
   "backwardYaw": 154,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43",
   "distance": 1
  },
  {
   "yaw": -79.43,
   "backwardYaw": -58.52,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_t.jpg",
 "label": "Closet",
 "id": "panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1F8E5064_0415_1879_4183_851972469B7D",
   "x": 357.73,
   "angle": 175.95,
   "y": 435.96,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_17C3D531_04F6_E7CE_418A_62DD8DBDDBD3",
  "this.overlay_17C3C531_04F6_E7CE_418F_A92CCD1CF0D6",
  "this.overlay_17A6A689_04EA_E2DF_4184_253713349B92",
  "this.overlay_17A6D689_04EA_E2DF_4192_9DAA118CEEFC",
  "this.overlay_1F318B49_052B_225F_415A_7658B95DBBA9"
 ]
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration"
},
{
 "hfov": 360,
 "label": "Cocina",
 "adjacentPanoramas": [
  {
   "yaw": -176.15,
   "backwardYaw": 6.24,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "distance": 1
  },
  {
   "yaw": -165.85,
   "backwardYaw": 14.03,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "partial": false,
 "id": "panorama_09DA293A_03ED_09C9_418B_D644E235A6CB",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 769.77,
   "angle": 0,
   "y": 472.47,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_113B7D32_0417_09DE_418D_EF84BE52E362",
  "this.overlay_11518E18_0417_0BC9_4180_04CFEFD6966E",
  "this.overlay_128636B0_0433_18DA_4188_81FA430E8DCF",
  "this.overlay_0971BD13_04E9_27F3_415F_13FF64EC5BEA",
  "this.overlay_094B3D14_04E9_27F5_417B_C6365FB63A99"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -16.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2DE61716_2122_7BE4_4150_4FE2F24840F0"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 72.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_2AD6A65E_2122_7A65_41B9_822EA865CF19",
 "id": "camera_2AD6965E_2122_7A65_41C0_27226D0EFA5F",
 "automaticRotationSpeed": 12
},
{
 "hfov": 360,
 "partial": false,
 "adjacentPanoramas": [
  {
   "yaw": -34.71,
   "backwardYaw": 125.07,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
   "distance": 1
  },
  {
   "yaw": -107.31,
   "backwardYaw": 77.61,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E"
  },
  {
   "yaw": 3.22,
   "backwardYaw": 17.04,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_t.jpg",
 "label": "Ingreso",
 "id": "panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
 "pitch": 0,
 "hfovMax": 130,
 "mapLocations": [
  {
   "map": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "x": 960.14,
   "angle": 0,
   "y": 1737.29,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "overlays": [
  "this.overlay_0CCB93D4_03FD_385A_4181_B564DCF8F297",
  "this.overlay_0C4F3A96_03FD_08D9_4189_9BAA38EC519D",
  "this.overlay_13B15E2A_03FD_0BC9_4160_CFD6D1210B08",
  "this.overlay_130E11C3_0435_18BE_4180_2522E3CB1CDB",
  "this.overlay_136E0543_043D_19BE_417E_201A0D88DD7C",
  "this.overlay_13799120_043F_79FA_417D_BF8764D8DF5C",
  "this.overlay_13B74E77_0435_0847_416F_EAB23730AC6E",
  "this.overlay_1D00AE88_042F_08CA_4166_08787097F9EE",
  "this.overlay_1DB36A36_0413_0BC6_4188_A9F1523CC9A0",
  "this.overlay_188757B8_041D_18C9_4190_33E10AA383E2",
  "this.overlay_1D868036_041D_17D9_418C_F57168C96AE8"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -26.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D6C96B5_2122_7A27_4194_ADEEDF0FAE27"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -1.26,
  "class": "PanoramaCameraPosition",
  "pitch": -3.01
 },
 "initialSequence": "this.sequence_1D9B6EAD_0473_08CB_4174_6DE3E70FD69E",
 "id": "panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_camera",
 "automaticRotationSpeed": 12
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_1FD90D93_0415_08DF_4190_221143275E0B",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_2C1DD5B9_2122_7E2F_41A2_0F8B3EE43BE4",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -1.26,
  "class": "PanoramaCameraPosition",
  "pitch": -4.52
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_09D72291_03ED_18DA_4185_437B866C59CE_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 100.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 360,
    "yawSpeed": 3.72,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_2D4686CB_2122_7A63_41AE_282DB177093D"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "class": "ViewerArea",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "12%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "30%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "class": "ViewerArea",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "MapViewer"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 88,
 "id": "ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF",
 "left": "2.17%",
 "scrollBarColor": "#FFFFFF",
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "paddingLeft": 20,
 "minHeight": 1,
 "width": "30%",
 "itemThumbnailShadowOpacity": 0.8,
 "verticalAlign": "middle",
 "itemLabelFontFamily": "Arial",
 "minWidth": 1,
 "itemBorderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "height": "66.776%",
 "itemOpacity": 1,
 "itemThumbnailShadowSpread": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0.2,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemThumbnailBorderRadius": 5,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemWidth": 150,
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "shadow": false,
 "itemMinHeight": 50,
 "borderSize": 0,
 "paddingRight": 20,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "playList": "this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF_playlist",
 "itemThumbnailShadowBlurRadius": 4,
 "bottom": "3.06%",
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "middle",
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 120,
 "click": "this.setComponentVisibility(this.IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1, true, 0, this.effect_0AA9A571_0527_6BC7_4188_B30F961A3ADF, 'showEffect', false)",
 "gap": 0,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 75,
 "paddingTop": 10,
 "itemThumbnailShadow": true,
 "paddingBottom": 10,
 "itemLabelGap": 5,
 "itemThumbnailShadowVerticalLength": 3,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList1355"
 },
 "class": "ThumbnailGrid",
 "scrollBarWidth": 10,
 "visible": false,
 "borderRadius": 5,
 "itemThumbnailShadowColor": "#000000"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1",
 "left": "0.48%",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "bottom": "0%",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "click": "if(!this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF.get('visible')){ this.setComponentVisibility(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF, true, 0, this.effect_0AD9A661_053B_29C4_418F_3DF56B5118DE, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_09C14A76_0529_39CC_4190_F00C4CB009EF, false, 0, this.effect_0AD9D661_053B_29C4_4192_DB69966A018C, 'hideEffect', false) }",
 "iconURL": "skin/IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1.png",
 "rollOverIconURL": "skin/IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_0ABF7281_0529_2944_4170_8934BDCD9BA1_pressed.png",
 "data": {
  "name": "Button53065"
 },
 "class": "IconButton",
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.06,
   "image": "this.AnimatedImageResource_1CEAB313_0413_19DE_417D_8C5E0437D4CC",
   "pitch": -11.33,
   "yaw": 156.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0, this.camera_2DD04737_2122_7A24_41B6_88B158A20822); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_11FBD64B_0412_F84E_413D_B9D3328CDCCA",
 "data": {
  "label": "Comedor"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.06,
   "yaw": 156.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_1CEAE313_0413_19DE_4182_7C928BD627C8",
   "pitch": -6.3,
   "yaw": -177.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72291_03ED_18DA_4185_437B866C59CE, this.camera_2DDF8741_2122_7A5C_41B9_44DDF2C5699C); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1282AE35_0413_0BDA_418F_E77578220BF5",
 "data": {
  "label": "Sala"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.16,
   "yaw": -177.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.11,
 "pitch": 0.31,
 "yaw": -78,
 "id": "overlay_13DED2D4_0433_1859_4164_CF05CA4D96EC",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.14
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Comedor"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_2_0.png",
      "width": 190,
      "class": "ImageResourceLevel",
      "height": 152
     }
    ]
   },
   "pitch": -10.6,
   "yaw": 156.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0972EF69_04E9_E25E_4173_631CD9CC4697",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.76,
   "yaw": 156.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_2_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Sala"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_3_0.png",
      "width": 103,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -5.78,
   "yaw": -177.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_09721F69_04E9_E25E_4193_64629FAD1217",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.72,
   "yaw": -177.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_3_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "media": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6275BF_2122_7E22_4175_79D7737103A2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_camera",
 "id": "PanoramaPlayListItem_2C6275BF_2122_7E22_4175_79D7737103A2",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6515C2_2122_7E5D_41B8_7AD254A73F61, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D72291_03ED_18DA_4185_437B866C59CE_camera",
 "id": "PanoramaPlayListItem_2C6515C2_2122_7E5D_41B8_7AD254A73F61",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C65A5C2_2122_7E5D_41B3_34340EC23169, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_camera",
 "id": "PanoramaPlayListItem_2C65A5C2_2122_7E5D_41B3_34340EC23169",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6645C2_2122_7E5D_41B5_20062562F9ED, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_camera",
 "id": "PanoramaPlayListItem_2C6645C2_2122_7E5D_41B5_20062562F9ED",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C66B5C3_2122_7E63_41B7_BBD595A29DD4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_camera",
 "id": "PanoramaPlayListItem_2C66B5C3_2122_7E63_41B7_BBD595A29DD4",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6745C3_2122_7E63_4198_E89E5C533E88, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_camera",
 "id": "PanoramaPlayListItem_2C6745C3_2122_7E63_4198_E89E5C533E88",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C67E5C3_2122_7E63_41A5_9D05BA7E6FD5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_camera",
 "id": "PanoramaPlayListItem_2C67E5C3_2122_7E63_41A5_9D05BA7E6FD5",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6855C3_2122_7E63_41B6_CF879C03A6FE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_camera",
 "id": "PanoramaPlayListItem_2C6855C3_2122_7E63_41B6_CF879C03A6FE",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09DF904F_03EE_F846_418A_EB4568234C91",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C68F5C4_2122_7E65_41A1_E23AB6147275, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09DF904F_03EE_F846_418A_EB4568234C91_camera",
 "id": "PanoramaPlayListItem_2C68F5C4_2122_7E65_41A1_E23AB6147275",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6965C4_2122_7E65_41B2_94612A0687C3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_camera",
 "id": "PanoramaPlayListItem_2C6965C4_2122_7E65_41B2_94612A0687C3",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6A05C4_2122_7E65_416D_FB32DB325BD1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_camera",
 "id": "PanoramaPlayListItem_2C6A05C4_2122_7E65_416D_FB32DB325BD1",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6AB5C4_2122_7E65_41B5_982FF893C803, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_camera",
 "id": "PanoramaPlayListItem_2C6AB5C4_2122_7E65_41B5_982FF893C803",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43",
 "end": "this.trigger('tourEnded')",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2C6B35C4_2122_7E65_41B2_0C63704E7CD3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_camera",
 "id": "PanoramaPlayListItem_2C6B35C4_2122_7E65_41B2_0C63704E7CD3",
 "class": "PanoramaPlayListItem"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.2,
   "image": "this.AnimatedImageResource_10646151_04E9_5E4F_4182_659C2A859B19",
   "pitch": -32.16,
   "yaw": 154,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7, this.camera_2ADFE669_2122_7A2F_41BB_FAC055BF32FA); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17904889_04EB_EEDE_4190_4A607E8E6243",
 "data": {
  "label": "Closet"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.2,
   "yaw": 154,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Walking Closet"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0_HS_1_0.png",
      "width": 184,
      "class": "ImageResourceLevel",
      "height": 214
     }
    ]
   },
   "pitch": -31.15,
   "yaw": 154.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_17905889_04EB_EEDE_417C_FB43FF017C21",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.69,
   "yaw": 154.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.41,
 "pitch": 65.13,
 "yaw": 17.96,
 "id": "overlay_1F38BC53_052B_E672_418D_348283000080",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.92,
   "image": "this.AnimatedImageResource_1CD2BB47_051B_2252_4189_9A9D3FAACAEF",
   "pitch": -34.69,
   "yaw": 17.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8, this.camera_2D7916BE_2122_7A25_4183_705B320D85C0); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1348650F_043D_39C6_4180_0E867291255F",
 "data": {
  "label": "Primer Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.92,
   "yaw": 17.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.09,
   "image": "this.AnimatedImageResource_1E058607_0435_3BC7_4190_178EE308C9A9",
   "pitch": -10.07,
   "yaw": -1.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792, this.camera_2D6C96B5_2122_7A27_4194_ADEEDF0FAE27); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12E7B07F_043D_7847_4190_1E2AEE9BDA7C",
 "data": {
  "label": "Dormitorio Master"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.09,
   "yaw": -1.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_1E053607_0435_3BC7_4177_62521CF1DEB0",
   "pitch": -11.83,
   "yaw": -28.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A, this.camera_2D6296AB_2122_7A23_4155_717DDCB40770); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13921F2C_043D_09CA_418B_DC3F29887813",
 "data": {
  "label": "Dormitorio Ni\u00f1a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.05,
   "yaw": -28.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.13,
   "image": "this.AnimatedImageResource_1E04D607_0435_3BC7_413C_7840AF2439E4",
   "pitch": -8.06,
   "yaw": -172.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DF904F_03EE_F846_418A_EB4568234C91, this.camera_2D1786A0_2122_7ADD_41AC_000524E60242); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13C08C85_043D_08BA_4167_08CD12C13FB2",
 "data": {
  "label": "Dormitorio Ni\u00f1o"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.13,
   "yaw": -172.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_1E049607_0435_3BC7_4179_A2DECB77A2DE",
   "pitch": -6.05,
   "yaw": 163.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DF7581_03ED_18BB_415E_7BE678826ED0, this.camera_2D0DC695_2122_7AE7_4199_BE806C581FCF); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_135A3F91_043D_08DA_4162_34584034F824",
 "data": {
  "label": "Ba\u00f1o Secuandario"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.16,
   "yaw": 163.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Dormitorio Master"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_5_0.png",
      "width": 211,
      "class": "ImageResourceLevel",
      "height": 189
     }
    ]
   },
   "pitch": -8.91,
   "yaw": -1.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16AA78B6_04FB_2E32_417A_086A2B6E031D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.53,
   "yaw": -1.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_5_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Dormitorio Ni\u00f1o"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_6_0.png",
      "width": 206,
      "class": "ImageResourceLevel",
      "height": 204
     }
    ]
   },
   "pitch": -7.24,
   "yaw": -172.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16AA58B6_04FB_2E32_4181_FE864A7F7E89",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.39,
   "yaw": -172.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_6_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Dormitorio Ni\u00f1a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_7_0.png",
      "width": 206,
      "class": "ImageResourceLevel",
      "height": 203
     }
    ]
   },
   "pitch": -10.56,
   "yaw": -27.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16C1841F_04FF_65F3_4177_0E69D87E540B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.32,
   "yaw": -27.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_7_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ba\u00f1o Compartido"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_8_0.png",
      "width": 252,
      "class": "ImageResourceLevel",
      "height": 216
     }
    ]
   },
   "pitch": -4.91,
   "yaw": 163.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_10BB093A_04FF_EE32_4185_11F599B8FFC4",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.08,
   "yaw": 163.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_8_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Primer Nivel"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_9_0.png",
      "width": 252,
      "class": "ImageResourceLevel",
      "height": 176
     }
    ]
   },
   "pitch": -34.05,
   "yaw": 17.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16826F5E_04FE_E275_418F_79E91499E161",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.55,
   "yaw": 17.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_9_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "map": {
  "width": 100,
  "x": 709.34,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1233.52
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 709.34,
  "height": 100,
  "y": 1233.52,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_0.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_199C25F4_0433_7859_4176_B147D4CFEB5E",
 "data": {
  "label": "Pasillo"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 344.24,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1030.11
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 344.24,
  "height": 100,
  "y": 1030.11,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_1.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_17AACECF_04EA_E252_4181_B948662B7F18",
 "data": {
  "label": "Ni\u00f1a"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 839.73,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1815.07
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 839.73,
  "height": 100,
  "y": 1815.07,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_2.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_178170D7_04EA_FE73_4185_AE9E634963B2",
 "data": {
  "label": "Ba\u00f1o"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 370.32,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1742.05
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 370.32,
  "height": 100,
  "y": 1742.05,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_3.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1775C38B_04EA_E2D3_417E_35B4EBCF29E5",
 "data": {
  "label": "Ni\u00f1o"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 307.73,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 385.96
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 307.73,
  "height": 100,
  "y": 385.96,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_4.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_102826F5_04E9_6237_415F_FFA56D5D5929",
 "data": {
  "label": "closet"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 550.26,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_5_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 542.44
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 550.26,
  "height": 100,
  "y": 542.44,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_5.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1001797A_04E9_6E32_4183_BEBA528D0011",
 "data": {
  "label": "Master"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 252.96,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 563.3
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 252.96,
  "height": 100,
  "y": 563.3,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1F8E5064_0415_1879_4183_851972469B7D_HS_6.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_10C2427E_04E9_2232_4142_89DAECB94556",
 "data": {
  "label": "Ba\u00f1o 2"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.95,
   "image": "this.AnimatedImageResource_1065814F_04E9_5E53_4186_EE0CF8E1E36A",
   "pitch": -15.09,
   "yaw": -100.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC, this.camera_2D390680_2122_7ADD_41B6_46238F336C41); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1649C54F_04FB_2653_417A_C93B42A949A0",
 "data": {
  "label": "Primer Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.95,
   "yaw": -100.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Pasillo"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0_HS_1_0.png",
      "width": 136,
      "class": "ImageResourceLevel",
      "height": 175
     }
    ]
   },
   "pitch": -15.12,
   "yaw": -100.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1649B54F_04FB_2653_4157_3B93F1BB5915",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.75,
   "yaw": -100.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "blending": 0,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_1F269DE8_0536_E65E_4192_928E996FE92C.mp4"
 },
 "hfov": 40.02,
 "autoplay": false,
 "id": "overlay_1EC2F885_0529_2ED6_4172_EAA7725640A7",
 "mouseLeave": "this.overlay_1EC2F885_0529_2ED6_4172_EAA7725640A7.pause()",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_1EC2F885_0529_2ED6_4172_EAA7725640A7_t.jpg",
    "width": 2,
    "class": "ImageResourceLevel",
    "height": 2
   }
  ]
 },
 "pitch": 1.58,
 "useHandCursor": true,
 "roll": 0.9,
 "yaw": 150.41,
 "rotationY": -30.58,
 "rotationX": -1.93,
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "class": "VideoPanoramaOverlay",
 "vfov": 23.65,
 "distance": 50,
 "mouseEnter": "this.overlay_1EC2F885_0529_2ED6_4172_EAA7725640A7.play()"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.87,
   "image": "this.AnimatedImageResource_1065414F_04E9_5E53_4152_521D56456F26",
   "pitch": -17.36,
   "yaw": 178.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC, this.camera_2D02B68A_2122_7AED_4197_E1FC8A1F913D); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_164ED60D_04F9_65D6_418F_F4517A38B6CA",
 "data": {
  "label": "Primer Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.87,
   "yaw": 178.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Pasillo"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0_HS_1_0.png",
      "width": 137,
      "class": "ImageResourceLevel",
      "height": 174
     }
    ]
   },
   "pitch": -17.21,
   "yaw": 177.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_164EC60D_04F9_65D6_4176_5F43286B0DEA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.72,
   "yaw": 177.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "blending": 0,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_1F269DE8_0536_E65E_4192_928E996FE92C.mp4"
 },
 "hfov": 37.48,
 "autoplay": false,
 "id": "overlay_190A1EFD_0539_2237_418E_3D0386BFA15E",
 "mouseLeave": "this.overlay_190A1EFD_0539_2237_418E_3D0386BFA15E.pause()",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_190A1EFD_0539_2237_418E_3D0386BFA15E_t.jpg",
    "width": 2,
    "class": "ImageResourceLevel",
    "height": 2
   }
  ]
 },
 "pitch": 1.35,
 "useHandCursor": true,
 "roll": 0.14,
 "yaw": 82.54,
 "rotationY": -6.78,
 "rotationX": -1.33,
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "class": "VideoPanoramaOverlay",
 "vfov": 22.29,
 "distance": 50,
 "mouseEnter": "this.overlay_190A1EFD_0539_2237_418E_3D0386BFA15E.play()"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_2CAEC5F7_2122_7E23_41B4_5C874A2A514A",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "map": {
  "width": 100,
  "x": 910.14,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1687.29
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 910.14,
  "height": 100,
  "y": 1687.29,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_1.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_18BDE507_041D_79C7_4181_D793100115F1",
 "data": {
  "label": "Ingreso"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 680.65,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1376.95
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 680.65,
  "height": 100,
  "y": 1376.95,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_2.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_18224948_0417_0849_418F_5F628F651BA0",
 "data": {
  "label": "Comedor"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 359.89,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1987.19
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 359.89,
  "height": 100,
  "y": 1987.19,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_3.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_18B98051_042F_385A_4160_C32B754DED00",
 "data": {
  "label": "Sala"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 878.85,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 917.97
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 878.85,
  "height": 100,
  "y": 917.97,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_4.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0AAF75A4_04EE_E6D6_414A_5752591719BC",
 "data": {
  "label": "Ba\u00f1o"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 349.45,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_5_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 680.65
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 349.45,
  "height": 100,
  "y": 680.65,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_5.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0A5EC656_04E9_2272_4164_493048CEA22E",
 "data": {
  "label": "Balcon"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 100,
  "x": 719.77,
  "height": 100,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 422.47
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 719.77,
  "height": 100,
  "y": 422.47,
  "class": "HotspotMapOverlayImage",
  "width": 100,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1FD90D93_0415_08DF_4190_221143275E0B_HS_6.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 100
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0A3C12E1_04E9_624E_418F_5D78B3378B9E",
 "data": {
  "label": "Cocina"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7,
   "image": "this.AnimatedImageResource_10657150_04E9_5E4D_4193_EC69612274A4",
   "pitch": -13.44,
   "yaw": 153.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC, this.camera_2D5216D6_2122_7A65_4152_66D3C3391B23); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1631E414_04F9_25F5_4151_254D14A43BA6",
 "data": {
  "label": "Primer Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7,
   "yaw": 153.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Pasillo"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_1_0.png",
      "width": 137,
      "class": "ImageResourceLevel",
      "height": 174
     }
    ]
   },
   "pitch": -13.04,
   "yaw": 153.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1631F414_04F9_25F5_4176_6F238C4F1BFE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.81,
   "yaw": 153.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.16,
   "image": "this.AnimatedImageResource_10653150_04E9_5E4D_4182_DF7CA5D46F73",
   "pitch": -32.67,
   "yaw": -58.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7, this.camera_2D4686CB_2122_7A63_41AE_282DB177093D); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1091F6FE_04F9_2232_4177_036B6F01CABC",
 "data": {
  "label": "Closet"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.16,
   "yaw": -58.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Walking Closet"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_3_0.png",
      "width": 165,
      "class": "ImageResourceLevel",
      "height": 215
     }
    ]
   },
   "pitch": -31.61,
   "yaw": -57.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1091C6FE_04F9_2232_415A_70D6FA524F36",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.06,
   "yaw": -57.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_3_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "blending": 0,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_1F269DE8_0536_E65E_4192_928E996FE92C.mp4"
 },
 "hfov": 69.78,
 "autoplay": false,
 "id": "overlay_1FE25BDC_0537_6275_416A_7FF8B424D3E0",
 "mouseLeave": "this.overlay_1FE25BDC_0537_6275_416A_7FF8B424D3E0.pause()",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_1FE25BDC_0537_6275_416A_7FF8B424D3E0_t.jpg",
    "width": 2,
    "class": "ImageResourceLevel",
    "height": 2
   }
  ]
 },
 "pitch": -20.64,
 "useHandCursor": true,
 "roll": -20.7,
 "yaw": -136.95,
 "rotationY": -43.19,
 "rotationX": 28.98,
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "class": "VideoPanoramaOverlay",
 "vfov": 43.99,
 "distance": 50,
 "mouseEnter": "this.overlay_1FE25BDC_0537_6275_416A_7FF8B424D3E0.play()"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.28,
   "image": "this.AnimatedImageResource_1CEA1313_0413_19DE_4172_C32A67EB5DD0",
   "pitch": -53.53,
   "yaw": 84.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0, this.camera_2D2DE675_2122_7A27_41B7_2771CA9F08D6); this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_11B211B1_0415_F8DD_4164_50D9A16D06D6",
 "data": {
  "label": "Comedor"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.28,
   "yaw": 84.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -53.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Comedor"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0_HS_1_0.png",
      "width": 189,
      "class": "ImageResourceLevel",
      "height": 184
     }
    ]
   },
   "pitch": -53.07,
   "yaw": 84.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_097D0EF9_04EE_E23F_4170_F65D276AAC91",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.09,
   "yaw": 84.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -53.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.34,
 "pitch": 70.4,
 "yaw": -108.4,
 "id": "overlay_1F838502_052B_27D2_4193_56DB1308B9CB",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_1EF36FDE_0477_0846_4187_58C54C6887DF",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.66,
   "image": "this.AnimatedImageResource_1D0F92F3_0415_185F_418D_2A9C7E85965B",
   "pitch": -22.38,
   "yaw": 77.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8, this.camera_2AD6965E_2122_7A65_41C0_27226D0EFA5F); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13CA48C3_03F5_08BF_4151_758C30963D82",
 "data": {
  "label": "Ingreso"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.66,
   "yaw": 77.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.69,
   "image": "this.AnimatedImageResource_133A17E4_03F6_F879_4156_82F732075628",
   "pitch": -21.63,
   "yaw": 26.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0, this.camera_2AFE163E_2122_7A25_4197_C6CC92EF885F); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13EBB08B_03F7_38CE_4147_E14AD5AA6FBB",
 "data": {
  "label": "Comedor"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.69,
   "yaw": 26.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_133A77E4_03F6_F879_4181_328125730C58",
   "pitch": -3.29,
   "yaw": 14.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB, this.camera_2AC3A649_2122_7A6F_41A2_3E38FBE04C01); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12BFE59A_03F7_18C9_4186_3B05A188B0C7",
 "data": {
  "label": "Cocina"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 14.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.18,
   "image": "this.AnimatedImageResource_1D0FF2F3_0415_185F_418A_FF9244013EA5",
   "pitch": -3.81,
   "yaw": 23.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_100BC1C5_041D_18BB_4184_81850C8054AB",
 "data": {
  "label": "Ba\u00f1o"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.18,
   "yaw": 23.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_13E7CDD2_0415_085E_4189_AF41F740D026",
   "pitch": -3.29,
   "yaw": 0.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E, this.camera_2ACB5654_2122_7A65_41B7_657553D58F64); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1124751D_041D_79CB_418F_64B85B426D6C",
 "data": {
  "label": "Balcon"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 0.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.7,
 "pitch": 62.62,
 "yaw": 51.12,
 "id": "overlay_12A21846_0433_0846_4183_95F4680DAFB5",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Comedor"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_5_0.png",
      "width": 202,
      "class": "ImageResourceLevel",
      "height": 146
     }
    ]
   },
   "pitch": -21.12,
   "yaw": 26.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_184FDB7F_0415_0847_413D_BA54BAE0B9B4",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.79,
   "yaw": 26.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_5_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Cocina"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_6_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 138
     }
    ]
   },
   "pitch": -2.72,
   "yaw": 14.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1E353E5C_0415_084A_418F_F0B86050A91C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.59,
   "yaw": 14.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_6_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ingreso"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_7_0.png",
      "width": 166,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ]
   },
   "pitch": -21.68,
   "yaw": 78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1E357E5C_0415_084A_4164_100941E11595",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.57,
   "yaw": 78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_7_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Balcon"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_8_0.png",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 135
     }
    ]
   },
   "pitch": -2.56,
   "yaw": 0.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1E356E5C_0415_084A_4183_36D3D893BBCC",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.3,
   "yaw": 0.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_8_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ba\u00f1o"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_9_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -3.11,
   "yaw": 23.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1DF3D1A6_0417_78C6_4172_34A04A34F5C6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.19,
   "yaw": 23.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_9_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.14,
 "pitch": 1.82,
 "yaw": 119.46,
 "id": "overlay_1F692265_0529_6256_418E_A63A212ACF63",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.77,
   "image": "this.AnimatedImageResource_13E7BDD2_0415_085E_416F_9FE9E67D9492",
   "pitch": -19.87,
   "yaw": -150.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72291_03ED_18DA_4185_437B866C59CE, this.camera_2C5125E0_2122_7E5D_41B6_6665D75A1874); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_134A99D0_03ED_0859_4166_09140ED1ACAC",
 "data": {
  "label": "Sala"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.77,
   "yaw": -150.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_13E61DD2_0415_085E_4186_7DE6EB9ACCC5",
   "pitch": -3.29,
   "yaw": 6.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DA293A_03ED_09C9_418B_D644E235A6CB, this.camera_2CA085EC_2122_7E25_41B7_CA32A072B5D1); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12C846FE_03ED_3846_4168_FF964D53DA34",
 "data": {
  "label": "Cocina"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 6.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.41,
   "image": "this.AnimatedImageResource_13E6EDD3_0415_085E_4177_6CC227B4632C",
   "pitch": -27.15,
   "yaw": 125.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8, this.camera_2C8C660C_2122_7DE5_41BC_008FB38E10EE); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12555E19_03ED_0BCA_417B_69E4FCC53C25",
 "data": {
  "label": "Ingreso"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.41,
   "yaw": 125.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.18,
   "image": "this.AnimatedImageResource_13E6BDD3_0415_085E_4172_8DB33CF9F026",
   "pitch": -4.54,
   "yaw": -16.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E, this.camera_2CAEB5F7_2122_7E23_41BB_6A2CA30DB516); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10C1E400_0413_1FB9_4164_AB18BD610900",
 "data": {
  "label": "Balcon"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.18,
   "yaw": -16.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.18,
   "image": "this.AnimatedImageResource_13F91DD3_0415_085E_418F_29BDC8B9E6AE",
   "pitch": -3.79,
   "yaw": 20.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32, this.camera_2CBE7602_2122_7DDD_419C_C51AAAFB3ADF); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_113E81C5_0413_18BB_414C_D1037F6C1AFF",
 "data": {
  "label": "Ba\u00f1o"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.18,
   "yaw": 20.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.7,
 "pitch": 57.84,
 "yaw": -75.24,
 "id": "overlay_12E3C000_0433_17B9_418F_2BA6E3B05F00",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Sala"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_5_0.png",
      "width": 131,
      "class": "ImageResourceLevel",
      "height": 166
     }
    ]
   },
   "pitch": -19.4,
   "yaw": -150.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_257DFC16_0413_0FD9_417D_C628194B077B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.46,
   "yaw": -150.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Cocina"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_6_0.png",
      "width": 155,
      "class": "ImageResourceLevel",
      "height": 138
     }
    ]
   },
   "pitch": -2.51,
   "yaw": 6.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_257DCC16_0413_0FD9_418A_35306BADB882",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.59,
   "yaw": 6.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_6_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ingreso"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_7_0.png",
      "width": 166,
      "class": "ImageResourceLevel",
      "height": 143
     }
    ]
   },
   "pitch": -26.32,
   "yaw": 125.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_257DDC17_0413_0FC7_4190_2E90E9393620",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.37,
   "yaw": 125.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_7_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Balcon"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_8_0.png",
      "width": 146,
      "class": "ImageResourceLevel",
      "height": 147
     }
    ]
   },
   "pitch": -3.88,
   "yaw": -16.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_257DAC17_0413_0FC7_4190_BBC7DA4FCD9A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.28,
   "yaw": -16.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_8_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ba\u00f1o"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_9_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ]
   },
   "pitch": -3.46,
   "yaw": 20.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_257DBC17_0413_0FC7_418E_523194F86B3B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.18,
   "yaw": 20.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_9_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.5,
   "image": "this.AnimatedImageResource_1065D14F_04E9_5E53_4193_CE341A6287FB",
   "pitch": -25.39,
   "yaw": 166.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC, this.camera_2DE61716_2122_7BE4_4150_4FE2F24840F0); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_16A1D069_04F9_5E5E_4183_04574DD89CF8",
 "data": {
  "label": "Primer Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.5,
   "yaw": 166.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Pasillo"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0_HS_1_0.png",
      "width": 137,
      "class": "ImageResourceLevel",
      "height": 175
     }
    ]
   },
   "pitch": -25.1,
   "yaw": 166.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_16A1A069_04F9_5E5E_418D_152E470C899D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.49,
   "yaw": 166.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.3,
 "pitch": 59.35,
 "yaw": -52.13,
 "id": "overlay_1F3D895C_052B_6E76_415E_1AA0F0F3CECE",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_2C8C760C_2122_7DE5_41B2_83B225EEB58A",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_2D7936BE_2122_7A25_41A2_F3AECFA75AA2",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_2ACB6654_2122_7A65_41B1_EA7BFE0A2451",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.44,
   "image": "this.AnimatedImageResource_1064E150_04E9_5E4D_4167_A6112D5C376C",
   "pitch": -40.97,
   "yaw": -79.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792, this.camera_2DC2C72C_2122_7A24_41AB_0473E2AFE91F); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17C3D531_04F6_E7CE_418A_62DD8DBDDBD3",
 "data": {
  "label": "Dormitorio Master"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.44,
   "yaw": -79.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -40.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Dormitorio Master"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_1_0.png",
      "width": 220,
      "class": "ImageResourceLevel",
      "height": 219
     }
    ]
   },
   "pitch": -39.95,
   "yaw": -79.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_17C3C531_04F6_E7CE_418F_A92CCD1CF0D6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.08,
   "yaw": -79.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -39.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.22,
   "image": "this.AnimatedImageResource_1064A150_04E9_5E4D_4189_FEF335B94EC2",
   "pitch": -30.27,
   "yaw": 46.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43, this.camera_2DF3A721_2122_7BDC_41A1_290500B5B740); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17A6A689_04EA_E2DF_4184_253713349B92",
 "data": {
  "label": "Ba\u00f1o"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.22,
   "yaw": 46.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ba\u00f1o"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_3_0.png",
      "width": 136,
      "class": "ImageResourceLevel",
      "height": 173
     }
    ]
   },
   "pitch": -29.71,
   "yaw": 46.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_17A6D689_04EA_E2DF_4192_9DAA118CEEFC",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.26,
   "yaw": 46.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_3_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.38,
 "pitch": 70.91,
 "yaw": 85.54,
 "id": "overlay_1F318B49_052B_225F_415A_7658B95DBBA9",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.08,
   "image": "this.AnimatedImageResource_1CE98313_0413_19DE_4189_265C5F49F9F7",
   "pitch": -10.32,
   "yaw": -176.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0, this.camera_2D5F56E0_2122_7A5D_41BC_BAC9DD20F115); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_113B7D32_0417_09DE_418D_EF84BE52E362",
 "data": {
  "label": "Comedior"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.08,
   "yaw": -176.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_1CE91313_0413_19DE_4122_35B1803EAAE0",
   "pitch": -6.05,
   "yaw": -165.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72291_03ED_18DA_4185_437B866C59CE, this.camera_2DAB26EB_2122_7A23_41B0_FD6824CF99ED); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_11518E18_0417_0BC9_4180_04CFEFD6966E",
 "data": {
  "label": "Sala"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.16,
   "yaw": -165.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.7,
 "pitch": 60.86,
 "yaw": 18.21,
 "id": "overlay_128636B0_0433_18DA_4188_81FA430E8DCF",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Comedor"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_2_0.png",
      "width": 191,
      "class": "ImageResourceLevel",
      "height": 154
     }
    ]
   },
   "pitch": -9.64,
   "yaw": -176.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0971BD13_04E9_27F3_415F_13FF64EC5BEA",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.79,
   "yaw": -176.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_2_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Sala"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_3_0.png",
      "width": 103,
      "class": "ImageResourceLevel",
      "height": 140
     }
    ]
   },
   "pitch": -5.56,
   "yaw": -165.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_094B3D14_04E9_27F5_417B_C6365FB63A99",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.7,
   "yaw": -165.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_3_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_2AD6A65E_2122_7A65_41B9_822EA865CF19",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_134427E3_03F6_F87F_418C_B2B06915F8B7",
   "pitch": -3.54,
   "yaw": -8.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0CCB93D4_03FD_385A_4181_B564DCF8F297",
 "data": {
  "label": "Cocina"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": -8.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.44,
   "image": "this.AnimatedImageResource_133B07E4_03F6_F879_4188_C3398EA9B300",
   "pitch": -26.65,
   "yaw": -34.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D79DD8_03ED_084A_4151_85B3740D55C0, this.camera_2DB9F6F5_2122_7A27_41B8_A825F83F9DFB); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0C4F3A96_03FD_08D9_4189_9BAA38EC519D",
 "data": {
  "label": "Comedor"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.44,
   "yaw": -34.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_133B57E4_03F6_F879_4184_A7975ACCC216",
   "pitch": -20.62,
   "yaw": -107.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13B15E2A_03FD_0BC9_4160_CFD6D1210B08",
 "data": {
  "label": "Sala"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.74,
   "yaw": -107.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "bleaching": 0.62,
 "pitch": 48.8,
 "yaw": 19.22,
 "id": "overlay_130E11C3_0435_18BE_4180_2522E3CB1CDB",
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.35
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.19,
   "image": "this.AnimatedImageResource_1E0F1605_0435_3BBB_418B_50C7CC5C31FC",
   "pitch": -3.03,
   "yaw": -25.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_136E0543_043D_19BE_417E_201A0D88DD7C",
 "data": {
  "label": "Balcon"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": -25.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.84,
   "image": "this.AnimatedImageResource_1E0E9605_0435_3BBB_4188_041400FFF3A5",
   "pitch": 18.07,
   "yaw": 3.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC, this.camera_2D96F70C_2122_7BE4_41BB_BDA762337E1F); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13799120_043F_79FA_417D_BF8764D8DF5C",
 "data": {
  "label": "Segundo Nivel"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.84,
   "yaw": 3.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 18.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Cocina"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_5_0.png",
      "width": 152,
      "class": "ImageResourceLevel",
      "height": 186
     }
    ]
   },
   "pitch": -3.44,
   "yaw": -8.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_13B74E77_0435_0847_416F_EAB23730AC6E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.49,
   "yaw": -8.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Segundo Nivel "
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_6_0.png",
      "width": 284,
      "class": "ImageResourceLevel",
      "height": 186
     }
    ]
   },
   "pitch": 18.27,
   "yaw": 3.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1D00AE88_042F_08CA_4166_08787097F9EE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.71,
   "yaw": 3.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 18.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_6_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Comedor"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_7_0.png",
      "width": 191,
      "class": "ImageResourceLevel",
      "height": 186
     }
    ]
   },
   "pitch": -26.36,
   "yaw": -34.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1DB36A36_0413_0BC6_4188_A9F1523CC9A0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.19,
   "yaw": -34.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_7_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Sala"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_8_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 141
     }
    ]
   },
   "pitch": -20.12,
   "yaw": -107.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_188757B8_041D_18C9_4190_33E10AA383E2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.54,
   "yaw": -107.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_8_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Balcon"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_9_0.png",
      "width": 147,
      "class": "ImageResourceLevel",
      "height": 136
     }
    ]
   },
   "pitch": -2.28,
   "yaw": -25.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1D868036_041D_17D9_418C_F57168C96AE8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.31,
   "yaw": -25.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_9_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_1D9B6EAD_0473_08CB_4174_6DE3E70FD69E",
 "movements": [
  {
   "yawDelta": 360,
   "yawSpeed": 3.72,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CEAB313_0413_19DE_417D_8C5E0437D4CC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CEAE313_0413_19DE_4182_7C928BD627C8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DBF517_03ED_19C7_415E_9B5F87416D0E_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_10646151_04E9_5E4F_4182_659C2A859B19",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D9FCD2_03EF_085E_4180_2F02C532BD43_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CD2BB47_051B_2252_4189_9A9D3FAACAEF",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E058607_0435_3BC7_4190_178EE308C9A9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E053607_0435_3BC7_4177_62521CF1DEB0",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E04D607_0435_3BC7_413C_7840AF2439E4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E049607_0435_3BC7_4179_A2DECB77A2DE",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72AC1_03ED_08BA_4186_6F236A60FFFC_0_HS_4_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1065814F_04E9_5E53_4186_EE0CF8E1E36A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DF904F_03EE_F846_418A_EB4568234C91_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1065414F_04E9_5E53_4152_521D56456F26",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D60B7E_03EF_0846_4188_2614ED9C8C4A_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_10657150_04E9_5E4D_4193_EC69612274A4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_10653150_04E9_5E4D_4182_DF7CA5D46F73",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D9F6C6_03EF_18B9_415F_D3D9E8864792_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CEA1313_0413_19DE_4172_C32A67EB5DD0",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DB7FA7_03ED_08C7_415E_DE0817B73D32_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1D0F92F3_0415_185F_418D_2A9C7E85965B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_133A17E4_03F6_F879_4156_82F732075628",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_133A77E4_03F6_F879_4181_328125730C58",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1D0FF2F3_0415_185F_418A_FF9244013EA5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13E7CDD2_0415_085E_4189_AF41F740D026",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D72291_03ED_18DA_4185_437B866C59CE_0_HS_4_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13E7BDD2_0415_085E_416F_9FE9E67D9492",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13E61DD2_0415_085E_4186_7DE6EB9ACCC5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13E6EDD3_0415_085E_4177_6CC227B4632C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13E6BDD3_0415_085E_4172_8DB33CF9F026",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_13F91DD3_0415_085E_418F_29BDC8B9E6AE",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D79DD8_03ED_084A_4151_85B3740D55C0_0_HS_4_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1065D14F_04E9_5E53_4193_CE341A6287FB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DF7581_03ED_18BB_415E_7BE678826ED0_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1064E150_04E9_5E4D_4167_A6112D5C376C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1064A150_04E9_5E4D_4189_FEF335B94EC2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09D8A183_03EF_38BE_414F_3D4961DCD8F7_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CE98313_0413_19DE_4189_265C5F49F9F7",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1CE91313_0413_19DE_4122_35B1803EAAE0",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09DA293A_03ED_09C9_418B_D644E235A6CB_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_134427E3_03F6_F87F_418C_B2B06915F8B7",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_133B07E4_03F6_F879_4188_C3398EA9B300",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_133B57E4_03F6_F879_4184_A7975ACCC216",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E0F1605_0435_3BBB_418B_50C7CC5C31FC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1E0E9605_0435_3BBB_4188_041400FFF3A5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_088C1424_03ED_3FFA_417B_77DFD5D6D1E8_0_HS_4_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ]
}],
 "width": "100%",
 "overflow": "visible"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
