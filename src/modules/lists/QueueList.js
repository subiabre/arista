module.exports = class QueueList
{
    constructor(items = [])
    {
        /**
         * The internal objects
         * @typedef {Array}
         */
        this.items = items;
    }

    /**
     * Get the position of a queue item
     * @param {Object} item 
     * @returns {Number}
     */
    indexOf(item)
    {
        return this.items.indexOf(this.items.filter((current) => current.queueId === item.queueId)[0]);
    }

    /**
     * Push new data to the queue
     * @param {Object} item Raw data, will be assigned queue related properties
     * @returns {QueueList}
     */
    push(data)
    {
        const item = {
            queueId: new Date().getTime(),
            isPlaying: false,
            data: data
        }

        return new QueueList([...this.items, item]);
    }

    /**
     * Remove an item from the queue
     * @param {Object} item 
     * @returns {QueueList}
     */
    remove(item)
    {
        const pos = this.indexOf(item);

        return new QueueList([
            ...this.items.slice(0, pos),
            ...this.items.slice(pos + 1)
        ]);
    }

    /**
     * Update an item in the array with a new item
     * @param {Object} outdated The object to update
     * @param {Object} updated The object to replace the original object
     * @returns {QueueList}
     */
    update(outdated, updated)
    {
        const pos = this.indexOf(outdated);

        return new QueueList([
            ...this.items.array.slice(0, pos),
            updated,
            ...this.items.slice(pos + 1)
        ]);
    }

    /**
     * Updates the item `isPlaying` to true while updating all the other ones to false
     * @param {Object} item 
     * @returns {QueueList}
     */
    setAsPlaying(item)
    {
        return new QueueList(this.items.map(current => {
            const clone = {...current};

            if (clone.isPlaying) clone.isPlaying = false;
            if (clone.queueId === item.queueId) clone.isPlaying = true;

            return clone;
        }));
    }
}
