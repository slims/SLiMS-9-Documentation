# Membuat provider anda sendiri
Contoh kita akan membuat provider terkait Cache yang disimpan pada
Redis.

```php
<?php

class RedisCache extends \SLiMS\Cache\Contract
{
    private $options = null;

    /**
     * Register all options
     *
     * @param string $directory
     */
    public function __construct($optios)
    {
        $this->options = $options;
    }

    /**
     * Create a new cache files/value
     *
     * @param string $cacheName
     * @param mixed $contents
     * @return void
     */
    public function set(string $cacheName, $contents)
    {
        // tulis disini kode anda
    }

    /**
     * Get cache value
     *
     * @param string $cacheName
     * @param string $callBack
     * @return mixed
     */
    public function get(string $cacheName, $callBack = '')
    {
       // tulis disini kode anda
    }

    /**
     * Update cache value
     *
     * @param string $cacheName
     * @param mixed $contents
     * @return bool
     */
    public function put(string $cacheName, $contents)
    {
        // tulis disini kode anda
    }

    /**
     * Delete cache
     *
     * @param string $cacheName
     * @return void
     */
    public function destroy(string $cacheName)
    {
        // tulis disini kode anda
    }

    /**
     * Make cache clean as soon as posible
     *
     * @return void
     */
    public function purge()
    {
        // tulis disini kode anda
    }

    /**
     * Get path or key of cache
     *
     * @return string
     */
    public function getPath()
    {
        // tulis disini kode anda
    }

    /**
     * Get cache as list
     *
     * @return array
     */
    public function getList()
    {
        // tulis disini kode anda
    }

    /**
     * @return boolean
     */
    public function isExists(string $cacheName)
    {
        // tulis disini kode anda
    }
}

/**
 * Jika sudah membuat class seperti diatas, maka anda harus mendaftarkan provider anda
 * pada file config/cache.php pada opsi providers dengan format sebagai berikut
 * 
 *  'Redis' => [
 *     'class' => <another-cache-provider-namespace>
 *     'options' => [
 *         'prefix' => 'SLiMSCache:'
 *     ]
 *   ]
 */

```