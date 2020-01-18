/**
 * Debounce function to restrict the rate at which a function can fire.
 * @param func The function to be debounced
 * @param waitMilliseconds The amount of time in MS that has to pass after the last call
 * before the function will be executed
 * @param options If 'immediate' is passed, trigger the function on the leading edge instead of the trailing
 * Leading Edge vs Trailing Edge
 * e.g.
 * Scroll handler with immediate + 500ms wait
 * *user begins scrolling* - *execute function* - wait 500ms - *execute fn*
 * Scroll handler with no immediate + 500ms wait
 * *user begins scrolling* - wait 500ms - *execute fn* - wait 500ms
 */
export default function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds = 50,
  isImmediate?: false,
): F {
  let timeoutId: number | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    // https://github.com/TypeStrong/atom-typescript/issues/1053
    timeoutId = window.setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
