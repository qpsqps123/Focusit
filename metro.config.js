// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require("expo/metro-config");

// Create the default Expo config for Metro
// This includes the automatic monorepo configuration for workspaces
// See: https://docs.expo.dev/guides/monorepos/#automatic-configuration
const config = getDefaultConfig(__dirname);
module.exports = config;
