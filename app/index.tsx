import LizardField from "@/components/LizardField";
import { useMotionOffset } from "@/hooks/useMotionOffset";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Text, View } from "react-native";

export default function Index() {
  const motionOffset = useMotionOffset();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  if (!cameraPermission) {
    return <View />
  }

  if (!cameraPermission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center text-xl mb-4">
          We need your permission to start the game.
        </Text>
        <Button onPress={requestCameraPermission} title="Grant Permission" accessibilityLabel="Grant Permission" />
      </View>
    )
  }

  return (
    <View className="flex-1">
      <CameraView className="absolute inset-0" facing="back" style={{ width: "100%", height: "100%" }} />
      <LizardField motionOffset={motionOffset} />
    </View>
  );
}
