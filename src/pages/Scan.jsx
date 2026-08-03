import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import jsQR from 'jsqr';
import { fetchMachines } from '../data/machinesRepo';

export default function Scan() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const machinesRef = useRef([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('starting');

  useEffect(() => {
    fetchMachines().then((m) => {
      machinesRef.current = m;
    });
  }, []);

  useEffect(() => {
    let raf;
    let cancelled = false;
    let stream;
    const canvas = document.createElement('canvas');

    function handleDecoded(text) {
      const match = text.match(/^ironlog:(.+)$/);
      const id = match ? match[1] : null;
      const found = machinesRef.current.find((m) => m.id === id);
      if (found) {
        navigate(`/log/${found.id}`);
        return;
      }
      // مو كود IronLog — لو كود QR الجهاز نفسه (من الشركة المصنعة) يودي لفيديو،
      // نستخدمه ونربطه بجهاز جديد بدل ما نوقف المستخدم برسالة خطأ
      if (/^https?:\/\//i.test(text)) {
        navigate(`/custom-exercise?videoUrl=${encodeURIComponent(text)}`);
        return;
      }
      setError('كود QR غير معروف — جرب جهاز ثاني أو اختره يدوياً من القائمة');
    }

    function tick() {
      const video = videoRef.current;
      if (!video) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code?.data) {
          handleDecoded(code.data);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStatus('scanning');
          tick();
        }
      } catch (err) {
        setStatus('error');
        setError('ما قدرنا نوصل للكاميرا — تأكد إنك عطيت التطبيق إذن الوصول لها');
      }
    }

    start();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [navigate]);

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">وجّه الكاميرا لكود QR اللي على الجهاز</p>

      <div className="qr-frame">
        <video ref={videoRef} muted playsInline />
        {status === 'scanning' && <div className="qr-target" />}
      </div>

      {status === 'starting' && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 12, textAlign: 'center' }}>يفتح الكاميرا...</p>
      )}
      {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 12, textAlign: 'center' }}>{error}</p>}

      <button className="btn" style={{ width: '100%', marginTop: 16 }} onClick={() => navigate('/muscle')}>
        اختر الجهاز يدوياً بدل ذلك
      </button>
    </div>
  );
}
