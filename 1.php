<?php
// Получаем заголовок секции
$accounting_title = get_field('accounting_title');

// Проверяем чекбокс "Вывести страницы?"
$is_page_try = get_field('is_page_try');

// Получаем ID страниц услуг
$service_page_ids_string = get_field('service_page_ids');
$service_page_ids = $service_page_ids_string ? explode(',', $service_page_ids_string) : [];

// Проверяем наличие контента услуг
$has_content = false;

if ($is_page_try && !empty($service_page_ids)) {
  $has_content = true;
} elseif (have_rows('accounting_cards_content')) {
  while (have_rows('accounting_cards_content')) {
    the_row();
    if (!empty(get_sub_field('title')) && !empty(get_sub_field('description'))) {
      $has_content = true;
      break;
    }
  }
}

// Если заголовок пустой или нет контента, не выводим блок
if (empty($accounting_title) || !$has_content) {
  return;
}

// Проверяем чекбокс "Вывести информацию о директоре?"
$show_director_info = get_field('show_director_info');

// Получаем информацию о директоре, если чекбокс включен
if ($show_director_info) {
  $director_video_url = get_field('director_video_url');
  $director_text = get_field('director_text');
  $director_image = get_field('director_image');
} else {
  // Если информация о директоре отключена, берем первое изображение
  $first_image = get_field('first_image');
}

// Получаем второе изображение
$second_image = get_field('second_image');
?>

<section class="accounting section bg-grey">
  <div class="container">
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h2 class="h2 text-center lh-1 text-uppercase">
          <?php echo esc_html($accounting_title); ?>
        </h2>
      </div>
    </div>

    <div class="row g-4 accounting-cards position-relative">
      <!-- Блок с изображением директора или первым изображением -->
      <?php if ($show_director_info): ?>
        <div class="col-md-6 col-lg-4 order-1 order-md-0 accounting-cards-img">
          <div class="card position-relative p-0">
            <img src="<?php echo esc_url($director_image); ?>" alt="Директор" loading="lazy">
            <button class="p-0 m-0 border-none accounting-cards-play btn btn-accent video-trigger" data-bs-toggle="modal"
              data-bs-target="#videoModal" data-video-url="<?php echo esc_url($director_video_url); ?>">
              <img class="img-fluid" src="<?php echo get_template_directory_uri(); ?>/img/icons/play.svg" alt="Play">
            </button>
          </div>
        </div>
      <?php else: ?>
        <div class="col-md-6 col-lg-4 order-1 order-md-0 accounting-cards-img">
          <div class="card position-relative p-0">
            <img src="<?php echo esc_url($first_image); ?>" alt="Placeholder" loading="lazy">
          </div>
        </div>
      <?php endif; ?>

      <?php if ($is_page_try && !empty($service_page_ids)): ?>
        <?php foreach ($service_page_ids as $index => $page_id):
          if ($index >= 4)
            break; // Ограничиваем до 4 элементов
          $page = get_post($page_id);
          if (!$page)
            continue;

          // Определяем классы order-* для карточек
          $order_classes = [
            'order-0 order-md-1',
            'order-2 order-md-2',
            'order-3 order-md-3',
            'order-5 order-md-4'
          ];
          ?>
          <div class="col-md-6 col-lg-4 <?php echo esc_attr($order_classes[$index]); ?>">
            <div class="card">
              <h3 class="h3 card-title"><?php echo esc_html(get_the_title($page)); ?></h3>
              <p class="card-text">
                <?php echo has_excerpt($page_id) ? esc_html(get_the_excerpt($page_id)) : ''; ?>
              </p>
              <a href="<?php echo esc_url(get_permalink($page_id)); ?>" class="btn btn-accent">Подробнее</a>
            </div>
          </div>
        <?php endforeach; ?>
      <?php else: ?>
        <?php if (have_rows('accounting_cards_content')):
          $index = 0; ?>
          <?php while (have_rows('accounting_cards_content')):
            the_row();
            if ($index >= 4)
              break; // Ограничиваем до 4 элементов
      
            $title = get_sub_field('title');
            $description = get_sub_field('description');
            $link = get_sub_field('link');
            $is_modal = get_sub_field('is_modal'); // Чекбокс "Показать модальное окно?"
      
            if (empty($title) || empty($description))
              continue;

            // Определяем классы order-* для карточек
            $order_classes = [
              'order-0 order-md-1',
              'order-2 order-md-2',
              'order-3 order-md-3',
              'order-5 order-md-4'
            ];
            ?>
            <div class="col-md-6 col-lg-4 <?php echo esc_attr($order_classes[$index]); ?>">
              <div class="card">
                <?php if ($is_modal): ?>
                  <h3 class="h3 card-title w-100 mb-3 mb-md-4"><?php echo esc_html($title); ?></h3>
                <?php else: ?>
                  <h3 class="h3 card-title"><?php echo esc_html($title); ?></h3>
                <?php endif; ?>
                <p class="card-text"><?php echo esc_html($description); ?></p>
                <?php if ($is_modal): ?>
                  <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#contactModal">
                    Оставить заявку
                  </button>
                <?php else: ?>
                  <a href="<?php echo esc_url($link); ?>" class="btn btn-accent">Подробнее</a>
                <?php endif; ?>
              </div>
            </div>
            <?php $index++; ?>
          <?php endwhile; ?>
        <?php endif; ?>
      <?php endif; ?>

      <!-- Второе изображение -->
      <div class="col-md-6 col-lg-4 order-4 order-md-5 accounting-cards-img">
        <div class="card position-relative p-0">
          <img src="<?php echo esc_url($second_image); ?>" alt="Image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</section>