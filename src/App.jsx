import { useState } from 'react'
import './App.css'
import logotipo from './resources/Logotipo.svg'
import linkedinIcon from './resources/icon linkedin.svg'
import facebookIcon from './resources/icon facebook.svg'
import instagramIcon from './resources/icon instagram.svg'

const galleryItems = [
  { title: 'Mokka Tentacion', tag: 'Especialidades', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85' },
  { title: 'Cumpleanos', tag: 'Momentos', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85' },
  { title: 'Torta Matilda', tag: 'Clasicos', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85' },
]

const processItems = [
  { number: '01', title: 'Elegimos lo esencial', text: 'Ingredientes nobles, combinaciones honestas y nada que no tenga un motivo.' },
  { number: '02', title: 'Horneamos cada manana', text: 'Empezamos temprano para que cada torta llegue fresca, suave y lista para celebrar.' },
  { number: '03', title: 'Lo hacemos tuyo', text: 'Cada detalle se adapta a tu momento. Porque no hay dos celebraciones iguales.' },
]

const menuItems = [
  { title: 'Maracuya', description: 'Torta hecha a base de 100% maracuya real.', category: 'Clasicos', size: 'Mediana', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85' },
  { title: 'Mokka Tentacion', description: 'Relleno ganache de chocolate y crema cafe.', category: 'Clasicos', size: 'Grande', image: galleryItems[0].image },
  { title: 'Oreo', description: 'Relleno de dulce de leche y queso crema con galletas oreo.', category: 'Clasicos', size: 'Mediana', image: galleryItems[1].image },
  { title: 'Matilda', description: 'Torta hecha a base de 60% cacao real.', category: 'Clasicos', size: 'Grande', image: galleryItems[2].image },
  { title: 'Selva Negra', description: 'Frescura de cerezas maduras y crema chantilly.', category: 'Especiales', size: 'Grande', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=700&q=85' },
]

const portions = [
  ['10', '2', '-'], ['16', '5', '2'], ['18', '8', '4'], ['20', '10', '5'],
  ['22', '14', '7'], ['24', '18', '9'], ['26', '25', '12'], ['28', '28', '14'], ['32', '30', '15'],
]

function Logo({ onNavigate }) { return <a className="logo" href="#inicio" onClick={(event) => { event.preventDefault(); onNavigate('home') }} aria-label="Patricia Pasteleria, inicio">Patricia <small>PASTELERIA</small></a> }

function Navbar({ view, onNavigate, cartCount }) {
  const [open, setOpen] = useState(false)
  const navigate = (destination) => { setOpen(false); onNavigate(destination) }
  return <nav className="navbar" aria-label="Navegacion principal"><Logo onNavigate={onNavigate} /><button className="menu-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span className="sr-only">Abrir menu</span></button><div className={`nav-links ${open ? 'is-open' : ''}`}><a className={view === 'home' ? 'active' : ''} href="#inicio" onClick={() => navigate('home')}>Inicio</a><a href="#historia" onClick={() => navigate('home')}>Nuestra historia</a><a className={view === 'menu' || view === 'detail' ? 'active' : ''} href="#menu" onClick={() => navigate('menu')}>Menu</a><a href="#galeria" onClick={() => navigate('home')}>Galeria</a><a className={view === 'faq' ? 'active' : ''} href="#faqs" onClick={() => navigate('faq')}>FAQs</a><a href="#contacto" onClick={() => navigate('home')}>Contacto</a></div><button className="cart-button" type="button" onClick={() => navigate('menu')}>Carrito ({cartCount})<small>$0,00.-</small></button></nav>
}

function Hero({ onNavigate }) { return <section className="hero" id="inicio"><div className="hero-copy"><p className="kicker">Pasteleria artesanal desde 2000</p><h1>Queremos darte<br /><em>el Gusto.</em></h1><p className="hero-text">Horneamos todo desde cero cada manana. No hay evento especifico. Solo bizcochuelo autentico que sabe como deberia.</p><div className="hero-actions"><a className="button" href="#menu" onClick={(event) => { event.preventDefault(); onNavigate('menu') }}>Explorar menu</a><a className="button button-outline" href="#historia">Nuestra historia</a></div></div><div className="hero-images"><div className="image-tall image-frame"><img src={galleryItems[0].image} alt="Torta decorada con crema y cerezas" /></div><div className="image-large image-frame"><img src={galleryItems[1].image} alt="Torta Patricia decorada" /></div></div></section> }

function Marquee() { return <div className="marquee"><div className="marquee-track">{['Mokka Tentacion', 'Cumpleanos', 'Torta Matilda', 'Dia de la primavera', 'Cheesecake', 'Primera comunion', 'Selva Negra', '15 anos', 'Tres leches'].map((item, index) => <span key={item} className={index % 2 ? 'highlight' : ''}>{item}<b>✦</b></span>)}</div></div> }

function MenuPage({ onSelectProduct }) {
  const [filter, setFilter] = useState('Todos')
  const filters = ['Todos', 'Clasicos', 'Tamanos']
  const visibleItems = menuItems.filter((item) => filter === 'Todos' || item.category === filter || item.size === filter)
  return <main className="menu-page"><section className="menu-heading section-shell"><div><p className="kicker">Menu diario <span className="spark">✦</span></p><h1>¿Que Tenemos <em>fresco</em> Hoy?</h1></div><div className="filter-control" aria-label="Filtrar productos">{filters.map((item) => <button type="button" className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></section>{filter === 'Tamanos' ? <SizeGuide /> : <><section className="product-row">{visibleItems.map((item) => <article className="product-card" key={item.title}><div className="product-image"><img src={item.image} alt={item.title} /></div><div className="product-info"><h2>{item.title}</h2><p>{item.description}</p><button type="button" className="add-button" aria-label={`Ver ${item.title}`} onClick={() => onSelectProduct(item)}>+</button></div></article>)}</section><section className="collection-banner"><p>La coleccion</p><h2>Cada <em>mordisco</em> Cuenta Una Historia.</h2></section><Marquee /></>}</main>
}

function ProductDetail({ product, onAdd, onBack, onPickupClosed }) {
  const [quantity, setQuantity] = useState(1)
  const [dedicationOpen, setDedicationOpen] = useState(false)
  const [pickupOpen, setPickupOpen] = useState(false)
  const [event, setEvent] = useState('Feliz cumpleaños')
  const [name, setName] = useState('')
  const addWithoutDedication = () => { onAdd(quantity); setDedicationOpen(false) }
  const finalizePurchase = () => { onAdd(quantity); setDedicationOpen(false); setPickupOpen(true) }
  return <main className="detail-page"><section className="detail section-shell"><div className="detail-gallery"><button className="back-link" type="button" onClick={onBack}>← Volver al menu</button><div className="detail-thumbs"><img src={product.image} alt="" /><img src={product.image} alt="" /><img src={product.image} alt="" /></div><div className="detail-image image-frame"><img src={product.image} alt={product.title} /></div></div><div className="detail-copy"><p className="breadcrumb">Inicio &gt; Menu &gt; Tortas grandes &gt; {product.title}</p><h1>Torta {product.title}</h1><strong className="price">$92.000,00</strong><small className="tax-note">Precio sin impuestos</small><h2>Descripcion</h2><a className="portion-link" href="#tamanos">Ver tabla de porciones</a><p className="detail-description">Torta clasica de 20 centimetros de diametro (10 porciones)<br />Bizcochuelo mixto bien humedo.<br />Relleno de ganache de chocolate y crema ligera de cafe.<br />Conservar a 4°C.<br />Consumir dentro de las 48 horas.</p><label className="select-field">Bizcochuelo con Gelatina<select><option>Bizcochuelo con Gelatina</option><option>Bizcochuelo tradicional</option></select></label><label className="check-field"><input type="checkbox" /> Adicionar Frutas en el relleno</label><div className="cart-actions"><div className="quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div><button className="button" type="button" onClick={() => setDedicationOpen(true)}>Agregar al carrito</button></div></div></section><div className="cookie-note">Al navegar por este sitio aceptas el uso de cookies para agilizar tu experiencia de compra. <button type="button">Entendido</button></div><DetailSupport />{dedicationOpen && <div className="modal-backdrop" role="presentation"><section className="dedication-modal" role="dialog" aria-modal="true" aria-labelledby="dedication-title"><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setDedicationOpen(false)}>×</button><h2 id="dedication-title">Agregá una <em>Dedicatoria</em></h2><p>Como si de un libro se tratara, plasmamos a mano alzada y en letra cursiva un mensaje dulce para abrazar y celebrar a esa persona especial al momento de cortar la torta...</p><div className="dedication-fields"><select value={event} onChange={(eventValue) => setEvent(eventValue.target.value)} aria-label="Tipo de evento"><option>Feliz cumpleaños</option><option>Feliz aniversario</option><option>Felicitaciones</option><option>Te quiero</option></select><input value={name} onChange={(eventValue) => setName(eventValue.target.value)} placeholder="Ingresá un nombre" aria-label="Nombre para la dedicatoria" /></div><div className="modal-actions"><button className="button button-outline" type="button" onClick={addWithoutDedication}>Continuar sin dedicatoria</button><button className="button" type="button" onClick={finalizePurchase}>Finalizar compra</button></div></section></div>}{pickupOpen && <PickupModal onClose={() => { setPickupOpen(false); onPickupClosed() }} />}</main>
}

function PickupModal({ onClose }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const minDate = new Date().toISOString().split('T')[0]
  const confirmPickup = (event) => {
    event.preventDefault()
    const reservation = { date, time, firstName, lastName, phone, order: 'TMT01' }
    localStorage.setItem('patricia-pickup', JSON.stringify(reservation))
    const message = `Hola Patricia, quiero agendar el retiro del pedido N° TMT01.\n\nNombre: ${firstName} ${lastName}\nTeléfono: ${phone}\nFecha: ${date}\nHorario: ${time}\n\nRecordatorio para: +54 9 11 3911-9488\nDirección: Ibarrola 7136, Liniers.`
    window.open(`https://wa.me/5491144097334?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    onClose()
  }
  return <div className="modal-backdrop pickup-backdrop" role="presentation"><section className="pickup-modal" role="dialog" aria-modal="true" aria-labelledby="pickup-title"><button className="modal-close" type="button" aria-label="Cerrar" onClick={onClose}>×</button><h2 id="pickup-title">Horneada y <em>Lista</em> para retirar.</h2><form onSubmit={confirmPickup}><h3>Retiro por la pastelería</h3><div className="pickup-fields"><label>Elegí una fecha<input type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} required /></label><label>Seleccioná el horario<select value={time} onChange={(event) => setTime(event.target.value)} required><option value="" disabled>Seleccioná el horario</option><option>08:00 - 11:00</option><option>11:00 - 15:00</option><option>15:00 - 19:30</option></select></label></div><div className="pickup-customer"><input placeholder="Nombre" value={firstName} onChange={(event) => setFirstName(event.target.value)} required /><input placeholder="Apellido" value={lastName} onChange={(event) => setLastName(event.target.value)} required /><input placeholder="Teléfono argentino" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required /></div><p>Podés pasar a retirar tu pedido con el número de orden <strong>N° TMT01</strong> por la dirección <strong>Ibarrola 7136</strong> Liniers, Ciudad Autónoma de Buenos Aires. ¡Te esperamos!</p><button className="button pickup-submit" type="submit">Confirmar retiro por WhatsApp</button></form></section></div>
}

function CarePage() {
  const careItems = ['Conservar siempre en heladera o en un espacio bien refrigerado hasta el momento de consumo.', 'Retirar de la heladera unos minutos antes de servir para apreciar mejor sabores y texturas.', 'Si la trasladás en auto, apoyarla en el piso del asiento del acompañante para mayor estabilidad.', 'Evitar el contacto directo con calor, sol o fuentes de humedad.', 'Consumir dentro del plazo recomendado para disfrutarla en su mejor estado.']
  return <main className="care-page"><section className="care-content section-shell"><div className="care-image image-frame"><img src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85" alt="Porción de torta artesanal" /></div><div className="care-copy"><h1>Cuidados para tu <em>torta</em></h1>{careItems.map((item) => <p key={item}>{item}</p>)}<span className="care-signature">· PATRICIA</span></div></section></main>
}

function DetailSupport() {
  const [message, setMessage] = useState('')
  return <section className="detail-support"><div className="section-shell support-grid"><div className="support-copy"><p>Si te arrepentiste de una compra, podes pedir la cancelacion enviando este formulario con tu <strong>numero de orden</strong>. Tenes como maximo hasta <strong>10 dias corridos</strong> desde que iniciaste el pedido.</p><p>La informacion facilitada se utilizara unicamente para enviarle informacion y no para otros fines. Puede usar este formulario para solicitar la eliminacion de sus datos en cualquier momento.</p><div className="benefits"><strong>Compra protegida</strong><span>Tus datos cuidados durante toda la compra.</span><strong>Cambios y devoluciones</strong><span>Si no te gusta, podes cambiarlo por otro o devolverlo.</span></div></div><form onSubmit={(event) => event.preventDefault()}><label>Nombre<input /></label><label>Apellido<input /></label><label>Email<input type="email" required /></label><label>Telefono<input type="tel" /></label><label>Numero de orden<input /></label><label>Mensaje<textarea maxLength="800" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribi aca tu mensaje..." /><small>{message.length}/800</small></label><button className="button" type="submit">Enviar</button></form></div></section>
}

function SizeGuide() {
  return <section className="size-guide section-shell"><div className="size-table-wrap"><p className="kicker">Tabla de cantidades y porciones</p><table><thead><tr><th>Tamano de la torta<br />(diametro en cm)</th><th>Porciones<br />individuales</th><th>Porciones de<br />fiesta</th></tr></thead><tbody>{portions.map((row) => <tr key={row[0]}>{row.map((value) => <td key={value}>{value}</td>)}</tr>)}</tbody></table></div><div className="size-notes"><div className="size-level"><span />Torta chica</div><div className="size-level"><span />Torta mediana</div><div className="size-level"><span />Torta grande</div><p>Las medidas que manejamos en nuestro negocio son variadas y pueden hacerse a pedido. Consulte por sus pedidos mas personalizados.</p><a href="#recomendaciones">Revisa nuestras recomendaciones<br />para mantener tu torta en buen estado</a></div><ContactForm /></section>
}

function ContactForm() {
  const [message, setMessage] = useState('')
  return <section className="contact-form" id="recomendaciones"><div className="form-copy"><p>La informacion facilitada se utilizara unicamente para enviarle informacion y no para otros fines. Puede usar este formulario para solicitar la eliminacion de sus datos en cualquier momento.</p><div className="footer-seal">P</div></div><form onSubmit={(event) => event.preventDefault()}><label>Nombre<input name="nombre" /></label><label>Apellido<input name="apellido" /></label><label>Email<input name="email" type="email" required /></label><label>Telefono<input name="telefono" type="tel" /></label><label>Mensaje<textarea name="mensaje" maxLength="800" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribi aca tu mensaje..." /><small>{message.length}/800</small></label><button className="button" type="submit">Enviar</button></form></section>
}

function Story() { return <section className="story section-shell" id="historia"><div className="story-images"><div className="story-small image-frame"><img src={galleryItems[2].image} alt="Torta de celebracion" /></div><div className="story-large image-frame"><img src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=700&q=85" alt="Porcion de torta artesanal" /></div></div><div className="story-copy"><p className="kicker">Nuestra historia</p><h2>Nacidas desde una <em>simple</em> obsesion.</h2><p>Patricia comenzo en una pequena cocina en Liniers con un solo objetivo: hacer bizcochuelos que realmente sepan a bizcochuelo. Sin levadura industrial, sin aditivos, sin atajos. Solo harina, agua, cremas, productos vegetales y tiempo.</p><p>Hoy, horneamos todo fresco cada manana. Nuestro estilo tiene veinticuatro anos de antiguedad y ha viajado de evento en evento, adaptandose al centro del pais y desarrollando sabores inigualables.</p><div className="stats"><div><strong>24</strong><span>Antiguedad<br />anos</span></div><div><strong>8</strong><span>Comienzo<br />diario</span></div><div><strong>0</strong><span>Conservantes</span></div></div></div></section> }

function Gallery() { return <section className="gallery section-shell" id="galeria"><div className="section-intro"><div><p className="kicker">Hecho para compartir</p><h2>Un gusto para cada <em>historia.</em></h2></div><a href="#contacto" className="text-link">Ver todas las tortas <span>↗</span></a></div><div className="gallery-grid">{galleryItems.map((item) => <article className="gallery-card" key={item.title}><img src={item.image} alt={item.title} /><div><p>{item.tag}</p><h3>{item.title}</h3></div></article>)}</div></section> }

function Process() { return <section className="process" id="faqs"><div className="section-shell"><div className="section-intro process-heading"><div><p className="kicker">Nuestra manera</p><h2>Lo simple tambien puede ser <em>extraordinario.</em></h2></div></div><div className="process-grid">{processItems.map((item) => <article key={item.number}><span>{item.number}</span><div className="process-icon">✦</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section> }

function Footer() { return <footer className="footer" id="contacto"><div className="section-shell footer-grid"><div><img className="footer-logo" src={logotipo} alt="Patricia Pasteleria" /><p className="footer-note">Bizcochuelos frescos, sabores<br />marcados, cero pretension.<br />Hecho a mano dia a dia en Liniers<br />desde 2003.</p><p className="legal">Defensa de las y los consumidores. Para reclamos <u>ingresa aca</u>. / <u>Boton de arrepentimiento</u></p></div><div><p className="footer-label">Encontra tu proxima torta</p><a className="footer-link" href="mailto:patriciapasteleria2020@gmail.com">patriciapasteleria2020@gmail.com</a></div><div><p className="footer-label">Seguinos</p><div className="socials"><a href="#linkedin"><img src={linkedinIcon} alt="LinkedIn" /><span>LinkedIn</span></a><a href="#facebook"><img src={facebookIcon} alt="Facebook" /><span>Facebook</span></a><a href="https://www.instagram.com/patricia.pasteleria/?hl=es" target="_blank" rel="noreferrer"><img src={instagramIcon} alt="Instagram" /><span>Instagram</span></a></div></div></div><div className="footer-bottom section-shell"><span>Copyright Patricia Pasteleria · 2026. Todos los derechos reservados</span><span>Hecho con gusto</span></div></footer> }

function App() {
  const [view, setView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const selectProduct = (product) => { setSelectedProduct(product); setView('detail'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const addToCart = (quantity) => { setCartCount((count) => count + quantity) }
  return <><Navbar view={view} onNavigate={setView} cartCount={cartCount} />{view === 'menu' ? <MenuPage onSelectProduct={selectProduct} /> : view === 'detail' ? <ProductDetail product={selectedProduct} onAdd={addToCart} onBack={() => setView('menu')} onPickupClosed={() => setView('faq')} /> : view === 'faq' ? <CarePage /> : <main><Hero onNavigate={setView} /><Marquee /><Story /><Gallery /><Process /></main>}<Footer /></>
}

export default App
