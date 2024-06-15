export interface UserMetadata {
  createdAt: string;
  lastLoginAt: string;
  lastSignInTime: string;
  creationTime: string;
}

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
}

export interface ProactiveRefresh {
  user: UserImpl;
  isRunning: boolean;
  timerId: number | null;
  errorBackoff: number;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface ReloadUserInfo {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
}

export interface AuthImpl {
  app: FirebaseAppImpl;
  heartbeatServiceProvider: Provider;
  appCheckServiceProvider: Provider;
  config: Record<string, any>;
  currentUser: UserImpl;
}

export interface FirebaseAppImpl {
  name: string;
  options: Record<string, any>;
}

export interface Provider {
  get: () => any;
}

export interface UserImpl {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  providerData: ProviderData[];
  metadata: UserMetadata;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: ProactiveRefresh;
  stsTokenManager: StsTokenManager;
  tenantId: string | null;
  reloadListener: any;
  reloadUserInfo: ReloadUserInfo;
  _tokenResponse?: TokenResponse;
}

export interface TokenResponse {
  context: string;
  displayName: string;
  emailVerified: boolean;
  expiresIn: string;
  federatedId: string;
  firstName: string;
  fullName: string;
  idToken: string;
  kind: string;
  lastName: string;
  localId: string;
  oauthAccessToken: string;
  oauthExpireIn: number;
  oauthIdToken: string;
  photoUrl: string;
  providerId: string;
  rawUserInfo: string;
  refreshToken: string;
}

export interface AuthOperation {
  operationType: string; // 'signIn' in this case
  providerId: string; // 'google.com' in this case
  user: UserImpl;
  accessToken: string;
  auth: AuthImpl;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: ProactiveRefresh;
  providerData: ProviderData[];
  reloadListener: any;
  reloadUserInfo: ReloadUserInfo;
  stsTokenManager: StsTokenManager;
  tenantId: string | null;
  uid: string;
  _tokenResponse?: TokenResponse;
}
