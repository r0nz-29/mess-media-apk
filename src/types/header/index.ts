import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationRoutesWithParams} from '../navigation';

export type HeaderProps = {
  navigation: NativeStackNavigationProp<
    NavigationRoutesWithParams,
    keyof NavigationRoutesWithParams
  >;
  title: string;
};
