import LegalLayout, { H2, P, Ul } from './LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Términos y Condiciones de Uso" updatedAt="27 de agosto de 2026">
      <P>
        Estos Términos y Condiciones regulan el acceso y uso de Agenda Docente IA, prestado por Adrián
        Fernández López (NIF 48598772W). Al crear una cuenta aceptas estos términos, así como la Política
        de Privacidad y la Política de Cookies.
      </P>

      <H2>1. Descripción del servicio</H2>
      <P>
        Agenda Docente IA es una herramienta de gestión docente (horario, programaciones, currículum,
        rúbricas, calificaciones, comunicación con familias) con funciones opcionales de inteligencia
        artificial generativa (Gemini, de Google), que se activan aportando tu propia clave de la API.
      </P>

      <H2>2. Modalidad gratuita y futuros planes de pago</H2>
      <P>
        El servicio se ofrece actualmente de forma gratuita. Si en el futuro se introducen planes de pago
        o funciones premium, se te informará con antelación de las condiciones económicas, forma de pago,
        y de tu derecho de desistimiento en un plazo de 14 días naturales conforme al Real Decreto
        Legislativo 1/2007 (Texto Refundido de la Ley General para la Defensa de los Consumidores y
        Usuarios), y no se te cobrará nada sin tu aceptación expresa de esas nuevas condiciones.
      </P>

      <H2>3. Registro y cuenta</H2>
      <P>
        Para usar la aplicación necesitas crear una cuenta con datos veraces. Eres responsable de mantener
        la confidencialidad de tu contraseña y de toda actividad realizada desde tu cuenta. Debes ser mayor
        de edad para registrarte.
      </P>

      <H2>4. Uso aceptable</H2>
      <P>Al usar Agenda Docente IA te comprometes a:</P>
      <Ul>
        <li>Usar el servicio conforme a la normativa educativa y de protección de datos aplicable a tu centro.</li>
        <li>No introducir datos de alumnado que no estés autorizado a tratar.</li>
        <li>No utilizar la aplicación con fines ilícitos, ni intentar vulnerar su seguridad (por ejemplo, acceder a datos de otras personas usuarias).</li>
        <li>No usar las funciones de IA para generar contenido ofensivo, discriminatorio o ilegal.</li>
      </Ul>

      <H2>5. Contenido generado por inteligencia artificial</H2>
      <P>
        Las funciones de IA de Agenda Docente IA (Profi, generación de sugerencias, rúbricas, exámenes,
        comentarios, resúmenes) usan modelos de terceros (Gemini, de Google) a través de tu propia clave de
        API. El contenido generado es una propuesta automática: puede contener errores, imprecisiones o
        información incorrecta, y en ningún caso sustituye tu criterio profesional docente. Eres
        responsable de revisar y validar cualquier contenido generado por IA antes de usarlo (por ejemplo,
        antes de entregarlo a tu alumnado o incluirlo en documentación oficial). El titular del servicio no
        se hace responsable de las decisiones tomadas a partir de contenido generado por IA sin la
        supervisión adecuada.
      </P>

      <H2>6. Disponibilidad del servicio</H2>
      <P>
        Procuramos mantener el servicio disponible, pero no se garantiza un funcionamiento ininterrumpido.
        Puede haber interrupciones por mantenimiento, incidencias técnicas o causas ajenas (por ejemplo, de
        los proveedores de infraestructura utilizados).
      </P>

      <H2>7. Baja y eliminación de cuenta</H2>
      <P>
        Puedes eliminar tu cuenta en cualquier momento desde Ajustes → Seguridad. Esta acción borra de
        forma permanente e irreversible todos tus datos. También podemos suspender o cancelar cuentas que
        incumplan gravemente estos Términos, previo aviso salvo que la gravedad de la infracción lo impida.
      </P>

      <H2>8. Propiedad intelectual</H2>
      <P>
        El contenido que introduces (horarios, programaciones, alumnado, notas, comentarios) es de tu
        propiedad. El software, diseño y estructura de la aplicación son propiedad del titular del
        servicio. No está permitida su reproducción, distribución o modificación sin autorización.
      </P>

      <H2>9. Modificación de estos términos</H2>
      <P>
        Podemos actualizar estos Términos para adaptarlos a cambios normativos o del servicio. Si el
        cambio es sustancial, te lo notificaremos y, en caso de introducir condiciones económicas nuevas,
        solicitaremos tu aceptación expresa antes de aplicarlas.
      </P>

      <H2>10. Legislación y jurisdicción</H2>
      <P>
        Estos Términos se rigen por la legislación española. Cualquier controversia se someterá a los
        juzgados y tribunales competentes conforme a la normativa de protección de consumidores aplicable.
      </P>
    </LegalLayout>
  );
}
