import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const qrRegionId = 'qr-reader';

  const startScanner = async () => {
    setScanning(true);

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const html5QrCode = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          setResult(decodedText);
          html5QrCode.stop().then(() => {
            html5QrCode.clear();
            setScanning(false);
          });
        },
        (error) => {
          // Ошибки можно логировать при необходимости
        }
      );
    } catch (err) {
      console.error('Ошибка при доступе к камере:', err);
      setScanning(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🔍 Сканер QR СБП</h2>

      {!scanning && !result && (
        <button onClick={startScanner} style={styles.button}>
          Начать сканирование
        </button>
      )}

      <div id={qrRegionId} style={styles.scanner}></div>

      {result && (
        <div style={styles.result}>
          <strong>📋 Сканированные данные:</strong>
          <br />
          <span>{result}</span>
        </div>
      )}

      {!result && scanning && (
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
  button: {
    padding: '0.8rem 1.2rem',
    backgroundColor: '#00aaff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
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