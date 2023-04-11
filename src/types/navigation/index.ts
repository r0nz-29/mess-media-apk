import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NavigationRoutesWithParams = {
  Home: undefined;
  MessList: undefined;
  Login: undefined;
  Mess: {messId: string};
};

export type HomeScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Home'
>;

export type LoginScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Login'
>;

export type BrowseMessScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'MessList'
>;

export type MessScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Mess'
>;
