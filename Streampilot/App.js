import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Video from 'react-native-video';

export default function App() {
  const [url, setUrl] = useState('');
  const [cookie, setCookie] = useState('');
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef(null);

  const startPlayback = () => {
    if (!url) {
      Alert.alert('Enter URL', 'Please enter a stream URL (m3u, mpd, http).');
      return;
    }
    setPlaying(true);
    setPaused(false);
  };

  const onBuffer = (meta) => {
    console.log('buffer', meta);
  };

  const onError = (err) => {
    console.warn('player error', err);
    Alert.alert('Player error', JSON.stringify(err));
  };

  const customHeaders = cookie ? {Cookie: cookie} : {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter m3u/dash/hls url"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Optional: Cookie header"
          value={cookie}
          onChangeText={setCookie}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.button} onPress={startPlayback}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPaused(!paused);
          }}>
          <Text style={styles.buttonText}>{paused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUrl('');
            setPlaying(false);
            setPaused(true);
          }}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerContainer}>
        {playing ? (
          <Video
            ref={playerRef}
            source={{uri: url, headers: customHeaders}}
            style={styles.video}
            controls={true}
            fullscreen={fullscreen}
            onBuffer={onBuffer}
            onError={onError}
            paused={paused}
            resizeMode="contain"
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch={'ignore'}
            onFullscreenPlayerWillPresent={() => setFullscreen(true)}
            onFullscreenPlayerWillDismiss={() => setFullscreen(false)}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={{color: '#666'}}>Player will appear here</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12, backgroundColor: '#FFF'},
  inputRow: {marginVertical: 8},
  input: {borderWidth: 1, borderColor: '#DDD', padding: 10, borderRadius: 6},
  controlsRow: {flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12},
  button: {paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#1976D2', borderRadius: 6},
  buttonText: {color: '#FFF', fontWeight: '600'},
  playerContainer: {flex: 1, marginTop: 8, backgroundColor: '#000'},
  video: {flex: 1, backgroundColor: '#000'},
  placeholder: {flex: 1, alignItems: 'center', justifyContent: 'center'}
});
