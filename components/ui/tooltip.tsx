import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet, View, Animated } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  className,
  sideOffset = 4,
  portalHost,
  ...props
}: TooltipPrimitive.ContentProps & {
  ref?: React.RefObject<TooltipPrimitive.ContentRef>;
  portalHost?: string;
}) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // fade in on mount
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    return () => {
      // fade out on unmount
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  }, [opacity]);

  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View style={{ opacity }}>
          <TextClassContext.Provider value='text-sm native:text-base text-popover-foreground'>
            <TooltipPrimitive.Content
              sideOffset={sideOffset}
              className={cn(
                'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 shadow-md shadow-foreground/5',
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
