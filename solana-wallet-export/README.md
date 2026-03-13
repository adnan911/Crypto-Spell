# Solana Mobile Wallet Integration Pack

This folder contains the core files needed to integrate the Solana Mobile Wallet Adapter (MWA) into another Capacitor + React application.

## Files Included

1. `android-plugin/SolanaMobilePlugin.kt`: The native Android plugin that handles MWA.
2. `react-components/plugins/solanaMobile.ts`: The Capacitor JavaScript bridge.
3. `react-components/lib/solanaMobile.ts`: Helper utility functions.
4. `react-components/components/WalletButtons.tsx`: React UI component.
5. `android-res/`: The wallet bar layout and background XML resources.

## Integration Steps

1. **Copy Files to Your New App:**
   - Copy `SolanaMobilePlugin.kt` to `android/app/src/main/java/com/your/package/name/`. Update the `package` declaration at the top of the file to match your app.
   - Copy the `react-components` files to your `src` directory.
   - Copy `android-res/layout` and `android-res/drawable` contents to `android/app/src/main/res/`.

2. **Register the Plugin:**
   In your new app's `MainActivity.java` (`android/app/src/main/java/com/your/package/name/MainActivity.java`), register the plugin:

   ```java
   import android.os.Bundle;
   import com.getcapacitor.BridgeActivity;
   // Note: Your SolanaMobilePlugin might be in a different package, so import it if necessary.

   public class MainActivity extends BridgeActivity {
     @Override
     public void onCreate(Bundle savedInstanceState) {
       registerPlugin(SolanaMobilePlugin.class);
       super.onCreate(savedInstanceState);
     }
   }
   ```

3. **Install Dependencies:**
   Run the following in your React app's terminal:

   ```bash
   npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react bs58 lucide-react
   ```

4. **Update Gradle Configurations:**
   **a. Project-level (`android/build.gradle`):**
   Add the Solana repository:

   ```gradle
   allprojects {
       repositories {
           google()
           mavenCentral()
           maven { url "https://solanamobile.com/maven" }
       }
   }
   ```

   **b. App-level (`android/app/build.gradle`):**
   Add the client library dependency:

   ```gradle
   dependencies {
       // ... existing dependencies ...
       implementation 'com.solanamobile:mobile-wallet-adapter-clientlib-ktx:1.1.0'
   }
   ```

5. **Sync and Build:**
   ```bash
   npm run build
   npx cap sync android
   ```
