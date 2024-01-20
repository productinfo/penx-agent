import * as path from "node:path";

import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from "@electron-forge/maker-dmg";
// import { MakerPKG } from "@electron-forge/maker-pkg";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import packageJson from "./package.json";

const { version } = packageJson;
const iconDir = path.resolve(__dirname, "assets", "icons");
const root = process.cwd();

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "PenX Agent",
    executableName: "penx-agent",
    appBundleId: "com.penxio.penx-agent",
  },
  rebuildConfig: {
    // force: true,
    // useCache: true,
    // extraModules: ["appdmg"],
  },
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb(),
    new MakerDMG({
      format: "ULFO",
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "penxio",
          name: "penx-agent",
        },
        // prerelease: true,
        // prerelease: false,
        draft: true,
      },
    },
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
