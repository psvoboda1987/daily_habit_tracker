<?php

class Tracker
{
    private $object_factory;

    public function __construct(ObjectFactory $object_factory)
    {
        $this->object_factory = $object_factory;
    }

    public function saveRecords($data)
    {
        $habit_record = $this->object_factory->getObject('O_HabitRecord');
        $habit_record->setData($data);
        $habit_record->save();
    }

    public function getRecords()
    {
        $query = "
            SELECT *
            FROM `habit_record`
            ORDER BY `date` DESC
        ";

        $mysql = $this->object_factory->getObject(
            'MysqlPDO',
            HOSTNAME, USERNAME, PASSWORD, DB
        );

        return $mysql->fetch($query);
    }

    public function getStatistics()
    {
        $records = $this->getRecords();

        $statistics = [
            'habit_1' => 0,
            'habit_2' => 0,
            'habit_3' => 0,
        ];

        foreach ($records as $record) {

            if ($record['habit_1']) $statistics['habit_1']++;
            if ($record['habit_2']) $statistics['habit_2']++;
            if ($record['habit_3']) $statistics['habit_3']++;

        }

        $count = count($records);

        $statistics['total'] = $count;
        $statistics['rate_habit_1'] = (int) ceil(($statistics['habit_1'] / $count) * 100);
        $statistics['rate_habit_2'] = (int) ceil(($statistics['habit_2'] / $count) * 100);
        $statistics['rate_habit_3'] = (int) ceil(($statistics['habit_3'] / $count) * 100);

        return $statistics;
    }
}