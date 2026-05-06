import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="vibe-spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
}
