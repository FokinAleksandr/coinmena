import * as React from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import create from 'zustand';

import backIcon from '~/src/icons/backIcon/backIcon.png';
import { CountriesListScreen } from '~/src/screens/CountriesListScreen';
import { MainScreen } from '~/src/screens/MainScreen';
import { ReportCaseScreen } from '~/src/screens/ReportCaseScreen';
import { colors } from '~/src/ui/colors';
import { Box, Row } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

interface State {
  screens: ScreensType[];
  navigate: (newScreen: ScreensType) => void;
  goBack: () => void;
}

const useStore = create<State>(set => ({
  screens: ['Main'],
  navigate: (newScreen: ScreensType) =>
    set(state => ({ screens: state.screens.concat(newScreen) })),
  goBack: () => set(state => ({ screens: state.screens.slice(0, state.screens.length - 1) })),
}));

export function useNavigation() {
  return {
    navigate: useStore((state: State) => state.navigate),
    goBack: useStore((state: State) => state.goBack),
  };
}

export type ScreensType = 'Main' | 'CountriesList' | 'ReportCase';

export function ScreenResolver() {
  return (
    <Box style={StyleSheet.absoluteFill}>
      <AnimatedScreenWrapper name="Main" headerTitle="Main" Component={MainScreen} />
      <AnimatedScreenWrapper
        name="CountriesList"
        headerTitle="Countries list"
        Component={CountriesListScreen}
      />
      <AnimatedScreenWrapper
        name="ReportCase"
        headerTitle="Report case"
        Component={ReportCaseScreen}
      />
    </Box>
  );
}

function AnimatedScreenWrapper(props: {
  name: ScreensType;
  Component: React.FC;
  headerTitle: string;
}) {
  const { Component, name, headerTitle } = props;

  const canGoBack = useStore(state => state.screens.findIndex(screen => screen === name) > 0);
  const isShown = useStore(state => state.screens.includes(name));
  const goBack = useStore(state => state.goBack);

  const [isShownAfterAnimation, setIsShownAfterAnimation] = React.useState(isShown);
  const animatedValue = React.useRef(new Animated.Value(0));

  const animate = (toValue: number, cb?: () => void) => {
    Animated.timing(animatedValue.current, {
      duration: 500,
      toValue,
      useNativeDriver: true,
    }).start(cb);
  };

  React.useEffect(() => {
    if (isShown) {
      setIsShownAfterAnimation(true);
      animate(1);
    } else {
      animate(0, () => setIsShownAfterAnimation(false));
    }
  }, [isShown]);

  if (!isShownAfterAnimation) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.absoluteFillWrapper,
        {
          transform: [
            {
              translateX: animatedValue.current.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').width, 0],
              }),
            },
          ],
        },
      ]}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Row height={56} paddingHorizontal={12} alignItems="center" justifyContent="center">
          <Row flex={1} justifyContent="flex-start">
            {canGoBack ? (
              <Pressable onPress={goBack}>
                <Image style={styles.backIcon} source={backIcon} />
              </Pressable>
            ) : null}
          </Row>
          <Typography variant="h1" color={colors.white}>
            {headerTitle}
          </Typography>
          <Box flex={1} />
        </Row>
        <Box flex={1} backgroundColor={colors.white}>
          <Component />
        </Box>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  absoluteFillWrapper: {
    backgroundColor: colors.white,
    ...StyleSheet.absoluteFillObject,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.electric,
  },
  backIcon: {
    tintColor: colors.white,
  },
});
