<?php

declare(strict_types=1);

namespace App\Traits;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

trait UsesUuid
{
    protected string $uuidField = 'uuid';

    /**
     * Boot function from Laravel.
     */
    protected static function bootUsesUuid()
    {
        static::creating(function ($model) {
            if (Schema::hasColumn($model->getTable(), $model->uuidField) && empty($model->{$model->uuidField})) {
                $model->generateUuid();
            }
        });
    }

    /**
     * Get the uuidField for the model.
     */
    public function getUuidField(): string
    {
        return $this->uuidField;
    }

    /**
     * Set the uuid field for the model.
     *
     * @return $this
     */
    public function setUuidField(string $key): static
    {
        $this->uuidField = $key;

        return $this;
    }

    public function setUuidValue(string $value): void
    {
        $this->{$this->getUuidField()} = $value;
    }

    /**
     * Generate uuid based on the main model key.
     *
     * @throws Exception
     */
    public function generateUuid(): void
    {
        $uuid = Str::uuid()->toString();

        $attempts = 10;
        while ($this->uuidExists($uuid)) {
            if ($attempts <= 0) {
                throw new Exception(
                    "Unable to find unique uuid for record '{$this->getKey()}', tried 10 times..."
                );
            }

            $uuid = Str::uuid()->toString();
            $attempts--;
        }

        $this->setUuidValue($uuid);
    }

    private function uuidExists(string $uuid): bool
    {
        return $this->newQuery()
            ->where($this->getUuidField(), $uuid)
            ->where($this->getQualifiedKeyName(), '!=', $this->getKey())
            ->exists();
    }
}
