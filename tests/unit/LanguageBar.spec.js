import { mount } from '@vue/test-utils';
import LanguageBar from '@/components/LanguageBar.vue';

/**
 * Testando a instância LanguageBar.vue
 */
describe('LanguageBar.vue', () => {
  it('deve ser uma instancia vue', () => {
    const wrapper = mount(LanguageBar);
    expect(wrapper.vm).toBeDefined();
  });
});

/**
 * Definição da locale para pt_BR ao clicar no botão
 */
describe('LanguageBar.vue', () => {
  it('deve definir localidade para pt_BR ao clicar em PT', async () => {
    const wrapper = mount(LanguageBar, {
      global: {
        mocks: {
          $i18n: {
            locale: '',
          },
        },
      },
    });

    await wrapper.find('#pt').trigger('click');

    expect(wrapper.vm.$i18n.locale).toBe('pt_BR');
  });

  /**
   * Definição da locale para en_EN ao clicar no botão
   */
  it('deve definir o local para en_EN ao clicar em EN', async () => {
    const wrapper = mount(LanguageBar, {
      global: {
        mocks: {
          $i18n: {
            locale: '',
          },
        },
      },
    });

    await wrapper.find('#en').trigger('click');

    expect(wrapper.vm.$i18n.locale).toBe('en_US');
  });

  /**
   * Definição da locale para es_ES ao clicar no botão
   */
  it('deve definir o local para es_ES ao clicar em ES', async () => {
    const wrapper = mount(LanguageBar, {
      global: {
        mocks: {
          $i18n: {
            locale: '',
          },
        },
      },
    });

    await wrapper.find('#es').trigger('click');

    expect(wrapper.vm.$i18n.locale).toBe('es_ES');
  });

  /**
   * Teste para verificar se as classes CSS são aplicadas corretamente
   */
  it('deve ter as classes CSS corretas', () => {
    const wrapper = mount(LanguageBar);

    const flexClass = wrapper.find('.flex');
    const spanClass = wrapper.findAll('span');

    expect(flexClass.exists()).toBe(true);
    expect(spanClass.length).toBe(3);
  });
});
