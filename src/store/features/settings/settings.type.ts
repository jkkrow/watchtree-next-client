export interface SettingsSliceState {
  darkMode: boolean;
  upload: UploadConfig;
}

export interface UploadConfig {
  popupSize: 'full' | 'brief';
}
