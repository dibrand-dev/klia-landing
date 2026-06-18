export type FaqQuestion = { q: string; a: string }

export type FaqBlockData = {
  id: string
  eyebrow: string
  title: [string, string]
  altBg: boolean
  questions: FaqQuestion[]
}

export const FAQ_BLOCKS: FaqBlockData[] = [
  {
    id: 'antes-de-empezar',
    eyebrow: '01 · ANTES DE EMPEZAR',
    title: ['Todo lo que necesitás saber ', 'para arrancar.'],
    altBg: false,
    questions: [
      {
        q: '¿Necesito instalar algo para usar KLIA?',
        a: 'No. KLIA es una aplicación web — entrás desde cualquier navegador en tu celular, tablet o computadora. Sin descargas, sin actualizaciones manuales, sin instaladores. Si podés abrir una página web, podés usar KLIA.',
      },
      {
        q: '¿Cuánto tiempo lleva empezar a usarlo?',
        a: 'La mayoría de los profesionales tienen la agenda funcionando en menos de una hora. Cargás tus horarios de atención, agregás tus primeros pacientes y ya podés crear turnos. No hay capacitación previa requerida.',
      },
      {
        q: '¿Puedo probar KLIA antes de pagar?',
        a: 'Sí. Todos los registros nuevos acceden a 21 días completos con el plan Premium activo — sin tarjeta de crédito y sin compromiso. Podés cargar tus pacientes reales, crear turnos, probar la IA y generar planillas de obras sociales durante ese período. Si no te convence, no pagás nada.',
      },
      {
        q: '¿KLIA funciona desde el celular?',
        a: 'Sí. La plataforma está diseñada mobile-first. Podés consultar la agenda, registrar un cobro o dictar una nota de voz directamente desde el teléfono entre sesión y sesión.',
      },
      {
        q: '¿Puedo migrar mis pacientes desde otro sistema?',
        a: 'Si tenés tus pacientes en Excel, CSV o Google Sheets, el equipo de soporte se encarga de la importación sin costo adicional. Para iniciar el proceso abrí un ticket en soporte@klia.com.ar.',
      },
      {
        q: '¿KLIA funciona si no tengo conexión a internet?',
        a: 'No. KLIA requiere conexión para funcionar — es una aplicación en la nube. Está optimizada para funcionar bien con conexiones móviles lentas, pero sin internet no hay acceso.',
      },
    ],
  },
  {
    id: 'planes-y-precios',
    eyebrow: '02 · PLANES Y PRECIOS',
    title: ['Sin letra chica. Sin ', 'sorpresas.'],
    altBg: true,
    questions: [
      {
        q: '¿Cuánto cuesta KLIA?',
        a: 'Hay tres planes: Esencial a $15.000 ARS/mes, Profesional a $28.000 ARS/mes y Premium a $48.000 ARS/mes. Los precios se ajustan por inflación. Si pagás anual, pagás 10 meses y usás 12.',
      },
      {
        q: '¿Qué plan me conviene?',
        a: 'Depende de cómo trabajás. Si solo necesitás agenda e historia clínica, el plan Esencial alcanza. Si cobrás a obras sociales o querés el aviso automático de deuda y la IA, necesitás el Profesional. Si además querés que tus pacientes reserven online o subir estudios a Google Drive, el Premium es el indicado. Durante el trial de 21 días tenés acceso completo al Premium para que puedas evaluar con calma.',
      },
      {
        q: '¿Puedo cambiar de plan después?',
        a: 'Sí, en cualquier momento desde Ajustes. El cambio es inmediato.',
      },
      {
        q: '¿Cómo se paga?',
        a: 'Únicamente por Mercado Pago, con débito automático mensual o anual. No se aceptan otros medios de pago por ahora.',
      },
      {
        q: '¿Qué pasa cuando termina el trial?',
        a: 'El sistema te avisa con anticipación. Si elegís un plan, continuás sin interrupciones. Si no elegís ninguno, la cuenta queda pausada pero tus datos se conservan — podés retomar cuando quieras.',
      },
      {
        q: '¿Puedo cancelar cuando quiero?',
        a: 'Sí. Sin permanencia mínima, sin penalidades. Cancelás desde Ajustes y listo. Si querés exportar la información de tus pacientes antes de irte, solicitalo abriendo un ticket en soporte@klia.com.ar.',
      },
      {
        q: '¿Hay descuento para recién recibidos o profesionales que están arrancando?',
        a: 'Por ahora no hay descuento por categoría profesional, pero el plan Esencial está pensado exactamente para ese momento — cuesta menos que una hora de consulta y tiene todo lo que necesitás para arrancar ordenado.',
      },
    ],
  },
  {
    id: 'obras-sociales',
    eyebrow: '03 · OBRAS SOCIALES Y FACTURACIÓN',
    title: ['Liquidá el mes ', 'sin perder una tarde.'],
    altBg: false,
    questions: [
      {
        q: '¿KLIA funciona con mi obra social?',
        a: 'KLIA tiene generadores específicos para Hospital Italiano e IOMA, y un motor genérico que funciona con cualquier obra social: OSDE, Swiss Medical, PAMI, Galeno, Medifé, APROSS, OSPEDYC y el resto. Si tu obra social no está en la lista, el motor genérico se configura con los datos que necesitás.',
      },
      {
        q: '¿Cómo se genera una planilla de obra social?',
        a: 'Desde el módulo de Facturación seleccionás los pacientes y las sesiones del mes, revisás los datos y generás el PDF. Tu firma y sello escaneados se incluyen automáticamente. El proceso que antes llevaba horas se hace en 15 a 20 minutos.',
      },
      {
        q: '¿Puedo tener pacientes particulares y de obra social al mismo tiempo?',
        a: 'Sí. KLIA separa los cobros particulares de los de obra social. Cada uno tiene su propio historial y sus propios reportes — no se mezclan.',
      },
      {
        q: '¿KLIA emite facturas electrónicas AFIP?',
        a: 'Todavía no. La facturación electrónica ARCA/AFIP está en el roadmap para el segundo semestre de 2026. Por ahora KLIA gestiona la liquidación a obras sociales y los cobros, pero la factura electrónica la seguís haciendo desde el portal de AFIP.',
      },
      {
        q: '¿Puedo cobrar en dólares o en otras monedas?',
        a: 'Sí. KLIA soporta ARS, USD y EUR. La moneda se configura por paciente — podés tener algunos en pesos y otros en dólares dentro de la misma agenda, con reportes separados por moneda.',
      },
      {
        q: '¿El aviso de deuda llega a los pacientes de obra social también?',
        a: 'Sí. El aviso automático de deuda funciona para particulares y para pacientes con cobertura. La deuda de cada modalidad se muestra por separado en el panel de cobros.',
      },
    ],
  },
  {
    id: 'mis-datos',
    eyebrow: '04 · MIS DATOS Y PRIVACIDAD',
    title: ['Tus datos son ', 'tuyos.'],
    altBg: true,
    questions: [
      {
        q: '¿Dónde se guardan mis datos?',
        a: 'En servidores de Supabase con infraestructura en la región de América. KLIA cumple con la Ley 25.326 de Protección de Datos Personales y está registrado ante la AAIP con el expediente EX-2026-51700917. Toda la comunicación va encriptada por HTTPS.',
      },
      {
        q: '¿Los datos de mis pacientes son confidenciales?',
        a: 'Sí. Cada profesional ve únicamente sus propios pacientes — ningún otro usuario de KLIA tiene acceso a tu información. La base de datos usa Row Level Security: a nivel técnico es imposible que un usuario acceda a los datos de otro.',
      },
      {
        q: '¿KLIA puede ver mis historias clínicas?',
        a: 'No. El equipo de KLIA no accede al contenido clínico de tus pacientes. El acceso está restringido a nivel de base de datos.',
      },
      {
        q: '¿Qué pasa con mis datos si cancelo?',
        a: 'Los datos clínicos se conservan por 5 años post-cancelación, en cumplimiento con los estándares de la Ley 26.529 de derechos del paciente. Los datos de tu cuenta se conservan 2 años. Para exportar tu información antes de irte, abrí un ticket en soporte@klia.com.ar.',
      },
      {
        q: '¿Los archivos de mis pacientes en Google Drive son seguros?',
        a: 'Los archivos se guardan en tu propio Google Drive — no en los servidores de KLIA. KLIA solo guarda el ID del archivo para mostrártelo dentro de la plataforma. Si desconectás Google Drive, los archivos siguen siendo tuyos en tu cuenta de Google.',
      },
    ],
  },
  {
    id: 'integraciones',
    eyebrow: '05 · INTEGRACIONES Y FUNCIONES',
    title: ['Las herramientas que ya usás, ', 'conectadas.'],
    altBg: false,
    questions: [
      {
        q: '¿Cómo funciona la sincronización con Google Calendar?',
        a: 'Es bidireccional. Los turnos que creás en KLIA aparecen en tu Google Calendar, y los eventos que tengas en Google Calendar se tienen en cuenta para no mostrar horarios ocupados en tu link público de reservas. La sincronización es automática — no tenés que hacer nada manualmente.',
      },
      {
        q: '¿Las videollamadas funcionan sin Zoom ni Meet por separado?',
        a: 'KLIA genera automáticamente un link de Google Meet para cada turno que marcás como videollamada. El link va en el recordatorio al paciente 24 horas antes. No necesitás crear el meet manualmente ni copiar links.',
      },
      {
        q: '¿Cómo funciona el link público de reservas?',
        a: 'Es una URL única para tu perfil — por ejemplo klia.com.ar/p/nombre-apellido. La compartís donde quieras: Instagram, WhatsApp, tu firma de email. El paciente ve tu disponibilidad real, elige horario, modalidad (presencial u online) y puede pagar directamente si tenés Mercado Pago conectado. El turno aparece en tu agenda automáticamente.',
      },
      {
        q: '¿La IA accede a información sensible de mis pacientes?',
        a: 'El resumen clínico que genera Gemini usa únicamente las notas que vos cargaste en KLIA. No accede a información externa ni a datos de otros pacientes. El procesamiento sigue las políticas de privacidad de Google Gemini.',
      },
      {
        q: '¿La transcripción de voz funciona en español rioplatense?',
        a: 'Sí. Whisper large-v3-turbo tiene soporte completo para español y funciona bien con el acento argentino, términos clínicos locales y vocabulario técnico de salud mental, kinesiología y medicina clínica.',
      },
      {
        q: '¿KLIA funciona con obras sociales que tienen su propio sistema de autorización?',
        a: 'KLIA gestiona la liquidación y generación de planillas, pero no se conecta en tiempo real con los sistemas de autorización de las obras sociales. Las autorizaciones las seguís gestionando directamente con cada OS como siempre.',
      },
      {
        q: '¿Puedo configurar horarios distintos para cada día de la semana?',
        a: 'Sí. Desde Ajustes configurás los horarios de atención por día — por ejemplo lunes y miércoles de 9 a 13, martes y jueves de 15 a 19. El link público y la agenda respetan esos horarios automáticamente.',
      },
      {
        q: '¿KLIA maneja feriados nacionales y provinciales?',
        a: 'Sí. Hay integración con la API oficial de feriados de Argentina. Podés activar o desactivar feriados nacionales y provinciales por separado. Los días feriados no aparecen disponibles en el link público de reservas.',
      },
    ],
  },
]
