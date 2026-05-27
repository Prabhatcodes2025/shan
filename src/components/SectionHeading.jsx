function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={`space-y-4 ${centered ? 'mx-auto text-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <div className={`space-y-3 ${centered ? 'mx-auto' : ''}`}>
        <h2 className={`section-title ${centered ? 'mx-auto max-w-4xl' : 'max-w-3xl'}`}>
          {title}
        </h2>
        <div
          className={`h-px w-16 ${
            centered
              ? 'mx-auto bg-gradient-to-r from-transparent via-forest-400 to-transparent'
              : 'bg-gradient-to-r from-forest-400 via-ocean-400 to-transparent'
          }`}
        />
        {description && <p className={`section-copy ${centered ? 'mx-auto' : ''}`}>{description}</p>}
      </div>
    </div>
  );
}

export default SectionHeading;
