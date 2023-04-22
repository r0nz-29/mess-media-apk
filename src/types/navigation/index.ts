import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NavigationRoutesWithParams = {
  Home: undefined;
  MessList: undefined;
  Login: undefined;
  Mess: {messId: string};
  Notifications: undefined;
  Signup: undefined;
  Profile: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Home'
>;

export type LoginScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Login'
>;

export type SignupScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Signup'
>;

export type BrowseMessScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'MessList'
>;

export type MessScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Mess'
>;

export type NotificationScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Notifications'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'Profile'
>;
