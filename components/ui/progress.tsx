import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import { Platform, View, Animated } from 'react-native';
import { cn } from '~/lib/utils';

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressPrimitive.RootProps & {
  ref?: React.RefObject<ProgressPrimitive.RootRef>;
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <Indicator value={value} className={indicatorClassName} />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

function Indicator({ value, className }: { value: number | undefined | null; className?: string }) {
  const animatedWidth = React.useRef(new Animated.Value(value ?? 0)).current;

  React.useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: value ?? 0,
      useNativeDriver: false, // width cannot use native driver
      overshootClamping: true,
    }).start();
  }, [value, animatedWidth]);

  const widthStyle = {
    width: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['1%', '100%'],
      extrapolate: 'clamp',
    }),
  };

  if (Platform.OS === 'web') {
    return (
      <View
        className={cn('h-full w-full flex-1 bg-primary web:transition-all', className)}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      >
        <ProgressPrimitive.Indicator className={cn('h-full w-full', className)} />
      </View>
    );
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={[widthStyle]} className={cn('h-full bg-foreground', className)} />
    </ProgressPrimitive.Indicator>
  );
}
