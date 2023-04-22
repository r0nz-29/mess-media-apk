import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Mess} from '../../types/mess';
import {BrowseMessScreenProps} from '../../types/navigation';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';

export default function MessList({navigation}: BrowseMessScreenProps) {
  const [messes, setMesses] = useState<Mess[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .get('https://mess-media.cyclic.app/api/mess')
      .then(({data}) => {
        if (data.success) {
          setRefreshing(false);
          setMesses(data.data);
        }
      })
      .catch(error => {
        setRefreshing(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://mess-media.cyclic.app/api/mess')
      .then(({data}) => {
        if (data.success) {
          setMesses(data.data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View className="bg-white p-8 px-4">
      <Header title="Discover" navigation={navigation} />
      <TextInput
        className="text-black text-lg border rounded-xl border-gray-300 mt-4 px-4"
        onChangeText={setSearchTerm}
        placeholder="Search mess or owner"
        placeholderTextColor="gray"
        value={searchTerm}
      />
      <ScrollView
        className="mt-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex flex-row justify-between flex-wrap gap-1 gap-y-4 pb-24">
          {!!messes ? (
            messes.map(mess => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Mess', {messId: mess.id})}
                key={Math.random().toString(16)}
                className="border-slate-300 rounded-xl z-20 h-[30vh] max-h-fit flex flex-col justify-start border w-[45vw]">
                <Image
                  source={{uri: mess.photo}}
                  className="w-full rounded-xl h-full"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 1)']}
                  className="flex flex-col justify-end absolute z-10 bottom-0 w-full h-full rounded-xl p-2 px-4">
                  <Text className="text-white text-lg font-bold">
                    {mess.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <ActivityIndicator size={50} color="#aaaaff" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
