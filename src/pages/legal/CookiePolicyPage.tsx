import LegalLayout, { H2, P, Ul } from './LegalLayout';

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Política de Cookies" updatedAt="27 de agosto de 2026">
      <P>
        Esta página explica qué almacenamiento técnico (cookies y tecnologías similares, como
        localStorage) usa Agenda Docente IA, de acuerdo con el artículo 22.2 de la Ley 34/2002 de
        Servicios de la Sociedad de la Información (LSSICE) y la guía de la Agencia Española de Protección
        de Datos sobre el uso de cookies.
      </P>

      <H2>No usamos cookies de publicidad ni de analítica de terceros</H2>
      <P>
        Agenda Docente IA no incluye cookies publicitarias, de seguimiento entre sitios web ni de
        analítica de terceros (como Google Analytics). Por eso no mostramos un banner de aceptar/rechazar
        cookies: la ley solo lo exige cuando se usan cookies no esenciales, que no es nuestro caso.
      </P>

      <H2>Qué almacenamos y para qué</H2>
      <Ul>
        <li>
          Sesión de acceso (Firebase Authentication): necesaria para mantenerte identificado mientras usas
          la aplicación. Sin ella no podrías iniciar sesión ni acceder a tus datos. Es estrictamente
          necesaria y está exenta de consentimiento previo (art. 22.2 LSSICE).
        </li>
        <li>
          Preferencia de tema visual (localStorage, claves «theme-color» y «theme-mode»): recuerda el tema
          de color e claro/oscuro que elegiste, solo en tu propio navegador. También es almacenamiento
          técnico necesario para el funcionamiento esperado del servicio.
        </li>
      </Ul>
      <P>
        Ninguno de estos datos se usa para elaborar perfiles publicitarios ni se comparte con terceros con
        fines de marketing.
      </P>

      <H2>Cómo desactivarlas</H2>
      <P>
        Puedes borrar estos datos en cualquier momento desde la configuración de tu navegador (borrar datos
        de navegación de este sitio). Ten en cuenta que, al tratarse de almacenamiento estrictamente
        necesario, borrarlo puede hacer que se cierre tu sesión o que se pierda tu preferencia de tema, sin
        afectar al resto de funciones de la aplicación una vez vuelvas a iniciar sesión.
      </P>
    </LegalLayout>
  );
}
