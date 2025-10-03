import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

/**
 * SkeletonLoader component
 * Reusable loader that shows different skeletons based on "type"
 *
 * Types:
 * - "tag": For individual tags
 * - "card": For note cards
 * - default: Full form view
 */
function SkeletonLoader({ type }) {
  const isDark = document.documentElement.classList.contains('dark');

  const baseColor = isDark ? '#2b303b' : '#e0e0e0';
  const highlightColor = isDark ? '#232530' : '#f5f5f5';

  if (type === 'tag')
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            height={22}
            width={150}
            baseColor={baseColor}
            highlightColor={highlightColor}
            style={{ marginBottom: i !== 2 ? '5px' : '0' }}
          />
        ))}
      </>
    );

  if (type === 'card')
    return (
      <div className="mt-4 flex flex-col gap-1.5 px-3 text-sm md:px-7">
        <Skeleton height={22} width={200} baseColor={baseColor} highlightColor={highlightColor} />

        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              height={22}
              width={75}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          ))}
        </div>
        <Skeleton height={22} width={105} baseColor={baseColor} highlightColor={highlightColor} />
      </div>
    );

  return (
    <div className="flex flex-col gap-1 p-4 lg:w-[65%]">
      <Skeleton height={44} baseColor={baseColor} highlightColor={highlightColor} />
      <Skeleton height={30} baseColor={baseColor} highlightColor={highlightColor} />
      <Skeleton height={30} baseColor={baseColor} highlightColor={highlightColor} />
      <Skeleton height={2} baseColor={baseColor} highlightColor={highlightColor} />
      <Skeleton height="22rem" baseColor={baseColor} highlightColor={highlightColor} />
    </div>
  );
}

export default SkeletonLoader;

SkeletonLoader.propTypes = {
  type: PropTypes.string,
};
