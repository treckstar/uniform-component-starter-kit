import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { getTextClass } from '@/utils';

export type Props = ComponentProps<{
  fields: any;
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

export enum HeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundImage = 'backgroundImage',
}

const getHeroContentClass = (variantId?: string) => {
  switch (variantId) {
    case HeroVariant.ImageLeft:
      return 'flex-col lg:flex-row';
    case HeroVariant.ImageRight:
      return 'flex-col lg:flex-row-reverse';
    default:
      return '';
  }
};

const getTextStyleClass = (variantId: string | undefined) => {
  switch (variantId) {
    case HeroVariant.BackgroundImage:
      return 'text-primary-content';
    default:
      return 'text-secondary-content';
  }
};

const getContentAlignClass = (variantId: string | undefined) => {
  switch (variantId) {
    case HeroVariant.ImageLeft:
      return 'text-start';
    case HeroVariant.ImageRight:
      return 'text-start';
    default:
      return '';
  }
};

const Hero: FC<Props> = ({ fields = {}, component: { variant } = {} }) => {
  const { cta, title, description } = fields;
  const eyebrowText = cta;
  return (
    <div className={classNames('hero min-h-[500px] relative', getTextStyleClass(variant))}>
      {variant === HeroVariant.BackgroundImage && <div className="hero-overlay bg-opacity-60"></div>}
      <div className={classNames('hero-content text-center p-0', getHeroContentClass(variant))}>
        <div className={classNames('flex flex-col mx-1 md:mx-10', getContentAlignClass(variant))}>
          {eyebrowText && (
            <div className={classNames('text-sm font-bold tracking-wider uppercase my-3')}>{eyebrowText}</div>
          )}
          <h1 className={classNames('font-bold', getTextClass('h5'))}>{title}</h1>
          <div className={classNames('py-6')}>{description}</div>
        </div>
      </div>
    </div>
  );
};

[undefined, HeroVariant.ImageLeft, HeroVariant.ImageRight, HeroVariant.BackgroundImage].forEach(variantId => {
  registerUniformComponent({
    type: 'heroAiGenerated',
    component: Hero,
    variantId,
  });
});

export default Hero;
