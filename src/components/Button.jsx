import { FiArrowRight } from 'react-icons/fi'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon: Icon,
  animate = false,
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2'

  const variants = {
    primary: 'bg-[#0F766E] text-white hover:bg-[#0D6D63] hover:shadow-lg hover:shadow-[#0F766E]/20',
    secondary: 'bg-[#14B8A6] text-white hover:bg-[#0F766E]',
    outline: 'border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white',
    ghost: 'text-[#475569] hover:text-[#0F766E] hover:bg-[#F8FAFC]',
    accent: 'bg-[#F59E0B] text-white hover:bg-[#D97706] hover:shadow-lg hover:shadow-[#F59E0B]/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
  }

  // Animation classes
  const animClasses = {
    lift: 'hover-lift',
    scale: 'hover-scale',
    glow: 'hover-glow',
    bounce: 'hover:bounce',
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${animate ? animClasses[animate] : ''} ${className}`

  const content = (
    <>
      {children}
      {Icon && <Icon className="w-4 h-4 ml-2" />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {content}
    </button>
  )
}

export function SectionHeading({ 
  children, 
  subtitle, 
  align = 'left',
  className = '' 
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`max-w-2xl ${alignment[align]} ${className}`}>
      {subtitle && (
        <span className="inline-block text-[#14B8A6] font-medium text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
        {children}
      </h2>
    </div>
  )
}

export function Card({ 
  children, 
  className = '',
  hover = true,
  padding = 'md',
  image, // string URL or React node
  imageAlt = '',
  badge, // optional badge text
}) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`bg-white rounded-xl border border-[#E6EEF0] overflow-hidden ${hover ? 'transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1' : ''} ${className}`}>
      {image && (
        <div className="relative h-52 bg-gray-50">
          {typeof image === 'string' ? (
            <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            image
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity card-overlay"></div>

          {badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 text-[#0F766E] text-xs font-medium rounded-full card-badge">{badge}</span>
            </div>
          )}
        </div>
      )}

      <div className={paddingSizes[padding]}>
        {children}
      </div>
    </div>
  )
}
