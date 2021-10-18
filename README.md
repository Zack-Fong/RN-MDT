# RN-MDT
**Installation Steps via Command Line**
1. cd Desktop
2. git clone https://github.com/Zack-Fong/RN-MDT.git
3. cd RN-MDT
4. npm ci

**Run in Android Emulator/Device**
1. react-native run-android
2. Open another Terminal/Command Prompt and cd {RN_MDT} folder
3. Run command: adb reverse tcp:8080 tcp:8080

**Run in iOS Emulator/Device**
1. cd ios && pod install
2. open XCode, select device/simulator and run project

**Steps to use Own Machine's IP Address instead of localhost**
Own Machine's IP Address is needed for API to work in real devices
1. Go to configuration.js file
    - Path: ~/RN-MDT/src/api/configuration.js 
2. Replace CONFIG_IP_LOCAL_HOST with your own machine's IP Address
    - E.g. const CONFIG_IP_LOCAL_HOST = {own machine's IP Address};
    - 
- **Step to find Macbook's IP Address**
    - System Preferences -> Network -> Wi-Fi -> Status -> Will Show the IP Address
- **Step to find Windows's IP Address**
    1. Open Command Prompt
    2. Type **ipconfig/all** and press **Enter**
    3. **IP Address** will be shown as **IPv4 Address**

**Code Structure**
/**1. screens folder**
- Contains 3 screens:
  1. LoginScreen (Landing Screen)
  2. DashboardScreen
  3. TransferScreen
- Screen Flow:
  LoginScreen -> (upon press Login) -> DashboardScreen -> (upon press Transfer) -> Transfer Screen -> (upon press Cancel/Submit) -> Dashboard Screen -> (upon press Log Out) -> Remove token from AsyncStorage and redirect to Login Screen
- DashboardScreen -> pull down to refresh

**2. navigators folder**
- Organize Login, Dashobard & Transfer Screen into a Stack to be displayed in the App

**3. components folder**
- All reusuable components will be stored in this folder
- Purpose: Standardise reusuable UI components
- Examples:
  1. ActivityIndicatorOverlay: Shown to user when the screen is loading
  2. Button: A reusable button component which only the name, press function, flex and color varies
  3. TextInput: A reusable TextInput component which only the placeholder, onChangeTextFunction, secureTextEndtry and keyboard type varies
  4. Transaction: A resusable component that displays the transactional details in DaashboardScreen
  5. ErrorMessage: A resuable component to display error messages
 
**4. common folder**
 - color hex codes, constants and reusauble functions will be stored in this folder

**5. assests folder**
- contains images/icons resource file

**6. api folder**
- conatins all the functions that make the api calls
- conatins the api configuration file that contains base url etc.
