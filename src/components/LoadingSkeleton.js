const LoadingSkeletonItem = () => {
  return (
    <li className="book loading-skeleton-wrapper">
      <div className="top-card">
        <span className="img skeleton-anim"></span>
        <div>
          <span className="weeks-on-list skeleton-anim">
            Lorem, ipsum dolor.
          </span>
          <h4 className="skeleton-anim">Lorem ipsum dolor sit.</h4>
          <p className="skeleton-anim">Lorem, ipsum.</p>
        </div>
      </div>
      <div className="bottom-card">
        <div className="actions">
          <button className="skeleton-anim">Lorem ipsum</button>
          <button className="skeleton-anim">Lorem ipsum</button>
          <button className="skeleton-anim">Lorem ipsum</button>
        </div>
        <div className="details skeleton-anim">Lorem ipsum</div>
      </div>
    </li>
  );
};

const LoadingSkeleton = () => {
  return <ul className="book-list">
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
      <LoadingSkeletonItem />
  </ul>;
};

export default LoadingSkeleton;
