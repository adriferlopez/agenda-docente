import LegalLayout, { H2, P, Ul } from './LegalLayout';

export default function LegalNoticePage() {
  return (
    <LegalLayout title="Aviso Legal" updatedAt="27 de agosto de 2026">
      <P>
        En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de
        julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se
        facilitan a continuación los siguientes datos: el titular de este sitio web y de la aplicación
        «Agenda Docente IA» es:
      </P>

      <Ul>
        <li>Titular: Adrián Fernández López</li>
        <li>NIF: 48598772W</li>
        <li>Contacto: adrianfernandezlopezzz@gmail.com</li>
      </Ul>

      <P>
        Agenda Docente IA es actualmente un proyecto personal, desarrollado y mantenido por su titular sin
        que a fecha de esta actualización constituya una actividad mercantil registrada. El servicio se
        ofrece de forma gratuita. Si en el futuro se introdujeran planes de pago, se actualizará este Aviso
        Legal y los Términos y Condiciones con la información mercantil, fiscal y de contratación
        correspondiente antes de habilitar cualquier cobro, y se solicitará de nuevo el consentimiento de
        las personas usuarias para las nuevas condiciones.
      </P>

      <H2>Objeto</H2>
      <P>
        Agenda Docente IA es una aplicación web pensada para ayudar a docentes a organizar su horario
        escolar, programación semanal y anual, currículum, rúbricas, calificaciones y comunicación con
        familias, con apoyo de funciones de inteligencia artificial opcionales.
      </P>

      <H2>Condiciones de uso</H2>
      <P>
        El acceso y uso de la aplicación atribuye la condición de usuario y supone la aceptación de este
        Aviso Legal, de la Política de Privacidad, de la Política de Cookies y de los Términos y
        Condiciones de Uso, disponibles todos ellos desde el pie de página y desde el apartado de Ajustes
        de la aplicación.
      </P>

      <H2>Propiedad intelectual</H2>
      <P>
        El código, diseño, estructura de navegación y demás elementos de Agenda Docente IA son propiedad de
        su titular o se utilizan con la debida autorización, y están protegidos por la normativa de
        propiedad intelectual e industrial. Los datos curriculares (competencias, criterios de evaluación,
        saberes básicos) se basan en normativa educativa pública. El contenido que cada docente introduce
        en la aplicación (horarios, programaciones, alumnado, notas, comentarios) es de su exclusiva
        propiedad y responsabilidad.
      </P>

      <H2>Exclusión de responsabilidad</H2>
      <P>
        El titular no garantiza la disponibilidad continua e ininterrumpida del servicio y no se
        responsabiliza de los daños derivados de interrupciones, fallos técnicos o pérdida de datos, sin
        perjuicio de las medidas de seguridad y copia razonables que se aplican. La aplicación incorpora
        funciones de inteligencia artificial generativa; el contenido generado (sugerencias, rúbricas,
        exámenes, comentarios, resúmenes) puede contener errores y debe revisarse siempre antes de su uso
        profesional. Más información en los Términos y Condiciones.
      </P>

      <H2>Legislación aplicable y jurisdicción</H2>
      <P>
        Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
        derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales que
        correspondan conforme a la normativa de protección de consumidores aplicable.
      </P>
    </LegalLayout>
  );
}
