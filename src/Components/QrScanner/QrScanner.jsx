import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = () => {
  const [result, setResult] = useState('');

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🔍 Сканер QR СБП</h2>

      <div style={styles.scanner}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setResult(result?.text);
            }
          }}
          constraints={{ facingMode: 'environment' }}
          containerStyle={styles.qrContainer}
          videoContainerStyle={styles.videoContainer}
          videoStyle={styles.video}
        />
      </div>

      {result ? (
        <div style={styles.result}>
          <strong>📋 Сканированные данные:</strong>
          <br />
          <span>{result}</span>
        </div>
      ) : (
        <div style={styles.infoText}>
          Наведите камеру на QR код, чтобы начать сканирование.
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '1rem',
    maxWidth: '480px',
    margin: '0 auto',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: '#fff',
    backgroundColor: '#1e1e1e',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  scanner: {
    border: '2px dashed #666',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1', // квадрат
  },
  qrContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    opacity: 1,
  },
  result: {
    marginTop: '1.5rem',
    fontSize: '1rem',
    wordBreak: 'break-word',
    backgroundColor: '#333',
    padding: '1rem',
    borderRadius: '10px',
    color: '#fff',
  },
  infoText: {
    marginTop: '20px',
    color: '#aaa',
    textAlign: 'center',
  },
};

export default QrScanner;
