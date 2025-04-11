import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = () => {
  const [result, setResult] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner('qr-reader', {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      });

      scanner.render(
        (decodedText) => {
          setResult(decodedText);
          scanner.clear();
        },
        (error) => {
          // Можно логировать ошибки при желании
        }
      );

      scannerRef.current = scanner;
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🔍 Сканер QR СБП</h2>

      <div id="qr-reader" style={styles.scanner}></div>

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
    width: '100%',
    aspectRatio: '1 / 1',
    backgroundColor: '#000',
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